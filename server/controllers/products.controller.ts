import { omit } from "lodash";
import { Request, Response } from "express"
import { createProduct, findAllProducts, findProductByID, findProductByName, updateProduct, removeProduct } from "../services/product.services"


export const postProduct = async (req: Request, res: Response) => {
    try {
        const existingProduct = await findProductByName(req.body.name)
        if (existingProduct) {
            return res.status(400).json({ message: "Product already exist" })
        }
        const product = await createProduct(req.body)
        res.status(201).json({ data: product, message: "Product was successfully created!" })
    } catch (error) {
        res.status(422).json({ message: error.message })
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const Products = await findAllProducts()
        res.status(200).json({ data: Products })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getOneProduct = async (req: Request, res: Response) => {
    try {
        const Product = await findProductByID(req.params.id)
        res.status(200).json({ data: Product ? omit(Product.toJSON(), ["__v"]) : null })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const patchProduct = async (req: Request, res: Response) => {
    try {
        const Product = await updateProduct(req.params.id, req.body)
        if (!Product) {
            return res.status(400).json({ message: "Product doesn\'t exist" })
        }
        res.status(201).json({ message: "Product editted successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const Product = await removeProduct(req.params.id)
        if (!Product) {
            return res.status(400).json({ message: "Product doesn\'t exist" })
        }
        res.status(200).json({ data: omit(Product.toJSON(), ["__v"]), message: "Product deleted successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}