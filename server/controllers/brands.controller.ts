import { omit } from "lodash";
import { Request, Response } from "express"
import { createBrand, findAllBrands, findBrandByName, updateBrand, removeBrand } from "../services/brand.services"


export const postBrand = async (req: Request, res: Response) => {
    try {
        const existingBrand = await findBrandByName(req.body.name)
        if (existingBrand) {
            return res.status(400).json({ message: "Brand already exists!" })
        }
        const brand = await createBrand(req.body)
        res.status(201).json({ data: omit(brand.toJSON(), ["__v", "_id"]), message: "Brand created successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getBrands = async (req: Request, res: Response) => {
    try {
        const brands = await findAllBrands()
        res.status(200).json({ data: brands })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getOneBrand = async (req: Request, res: Response) => {
    try {
        const brand = await findBrandByName(req.params.name)
        res.status(200).json({ data: brand ? omit(brand.toJSON(), ["__v"]) : null })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const patchBrand = async (req: Request, res: Response) => {
    try {
        const brand = await updateBrand(req.params.id, req.body)
        if (!brand) {
            return res.status(400).json({ message: "Brand doesn\'t exist" })
        }
        res.status(201).json({ message: "Brand editted successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteBrand = async (req: Request, res: Response) => {
    try {
        const brand = await removeBrand(req.params.id)
        if (!brand) {
            return res.status(400).json({ message: "Brand doesn\'t exist" })
        }
        res.status(200).json({ data: omit(brand.toJSON(), ["__v"]), message: "Brand deleted successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}