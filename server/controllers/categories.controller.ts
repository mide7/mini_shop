import { omit } from "lodash";
import { Request, Response } from "express"
import { createCategory, findAllCategories, findCategoryByName, updateCategory, removeCategory } from "../services/category.services"


export const postCategory = async (req: Request, res: Response) => {
    try {
        const existingCategory = await findCategoryByName(req.body.name)
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists!" })
        }
        const Category = await createCategory(req.body)
        res.status(201).json({ data: omit(Category.toJSON(), ["__v", "_id"]), message: "Category created successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getCategories = async (req: Request, res: Response) => {
    try {
        const Categories = await findAllCategories()
        res.status(200).json({ data: Categories })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getOneCategory = async (req: Request, res: Response) => {
    try {
        const Category = await findCategoryByName(req.params.name)
        res.status(200).json({ data: Category ? omit(Category.toJSON(), ["__v"]) : null })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const patchCategory = async (req: Request, res: Response) => {
    try {
        const Category = await updateCategory(req.params.id, req.body)
        if (!Category) {
            return res.status(400).json({ message: "Category doesn\'t exist" })
        }
        res.status(201).json({ message: "Category editted successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const Category = await removeCategory(req.params.id)
        if (!Category) {
            return res.status(400).json({ message: "Category doesn\'t exist" })
        }
        res.status(200).json({ data: omit(Category.toJSON(), ["__v"]), message: "Category deleted successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}