import { Request, Response } from "express"
import { omit } from "lodash";
import { findUserOrders, placeOrder } from "../services/purchase.services"
import { updateUserShippingDetails, getUserShippingDetails } from "../services/shipping.services"

export const getShippingDetails = async (req: Request, res: Response) => {
    try {
        const shippingDetails = await getUserShippingDetails(req.params.id)
        res.status(200).json({ data: shippingDetails })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const postShippingDetails = async (req: Request, res: Response) => {
    try {
        const shippingDetails = await updateUserShippingDetails(req.body, req.params.id)
        res.status(200).json({ data: shippingDetails })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const postOrderProduct = async (req: Request, res: Response) => {
    try {
        const order = await placeOrder(req.params.id)
        if (order) {
            res.status(201).json({ data: omit(order.toJSON(), ["__v", "_id"]), message: "Your Order has been successfully placed" })
        }
        res.status(400).json({ message: "Sorry, cannot place order from an empty cart" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const order = await findUserOrders(req.params.id)
        res.status(200).json({ data: order })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}