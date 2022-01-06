import { omit } from "lodash";
import { Request, Response } from "express"
import { addProductToCart, getUserCart, removeCartItem } from "../services/cart.services";

export const postCart = async (req: Request, res: Response) => {
    try {
        const cart = await addProductToCart(req.body)
        res.status(201).json({ data: cart, message: "Product added successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await getUserCart(req.params.id)
        res.status(200).json({ data: cart })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const item = await removeCartItem(req.body)
        if (item) {
            return res.status(200).json({ message: "Product successfully removed from cart!", data: item })
        }
        res.status(400).json({ message: "Invalid request" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}