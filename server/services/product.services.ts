import ProductModel, { Product } from "../models/products.model";

export const createProduct = async (input: Product) => {
    try {
        return await ProductModel.create(input)
    } catch (error) {
        throw new Error(error)
    }
}

export async function findAllProducts() {
    try {
        return await ProductModel
            .find().select("name description brand category")
            .populate("brand", "name").populate("category", "name").exec()
    } catch (error) {
        throw new Error(error)
    }
}

export async function findProductByID(id: string) {
    try {
        return await ProductModel.findById(id).populate("brand", "name").populate("category", "name").exec()
    } catch (error) {
        throw new Error(error)
    }
}

export async function findProductByName(name: string) {
    try {
        return await ProductModel.findOne({ name }).exec()
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateProduct(id: string, body: Product) {
    try {
        return await ProductModel.findOneAndUpdate(
            { _id: id },
            { name: body.name, description: body.description, brand: body.brand, category: body.category, price: body.price }
        )
    } catch (error) {
        throw new Error(error)
    }
}

export async function removeProduct(id: string) {
    try {
        return await ProductModel.findOneAndDelete({ _id: id })
    } catch (error) {
        throw new Error(error)
    }
}