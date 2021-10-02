import { DocumentDefinition } from "mongoose";
import CategoryModel, { Category } from "../models/categories.model"

export async function createCategory(input: DocumentDefinition<Category>) {
    try {
        return await CategoryModel.create(input)
    } catch (error) {
        throw new Error(error)
    }

}

export async function findAllCategories() {
    try {
        return await CategoryModel.find().select("name").exec()
    } catch (error) {
        throw new Error(error)
    }
}

export async function findCategoryByName(name: string) {
    try {
        return await CategoryModel.findOne({ name: name }).exec()
    } catch (error) {
        throw new Error(error)
    }
}
export async function findCategoryByID(id: string) {
    try {
        return await CategoryModel.findById(id).exec()
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateCategory(id: string, body: Category) {
    try {
        return await CategoryModel.findOneAndUpdate({ _id: id }, { name: body.name })
    } catch (error) {
        throw new Error(error)
    }
}

export async function removeCategory(id: string) {
    try {
        return await CategoryModel.findOneAndDelete({ _id: id })
    } catch (error) {
        throw new Error(error)
    }
}