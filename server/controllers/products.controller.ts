import { Request, Response } from "express"
import BrandModel from "../models/brands.model"
import ProductModel, { Product } from "../models/products.model"

const products: Product[] = []

export const getAllProducts = async (req: Request, res: Response) => {
    res.status(200).json({ data: products })
}

export const postProduct = async (req: Request, res: Response) => {
    const { name, brand, description } = req.body

    const existingBrand = await BrandModel.findOne({ id: brand })

    if (existingBrand) {
        const newProduct = {
            name,
            brand,
            description
        }

        const product = new ProductModel(newProduct)

        try {
            await product.save()
            res.status(201).json({ data: product, message: "Product was successfully created!" })
        } catch (error) {
            if (error) {
                res.status(422).json({ message: "Something went wrong!" })
            }
        }
    } else {
        res.status(422).json({ message: "Brand doesn't exist" })
    }
}