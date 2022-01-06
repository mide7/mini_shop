import OrderModel from "../models/orders.model"
import { findUserById } from "./user.services"
import crypto from "crypto"



export async function placeOrder(id: string) {
    try {
        const user = await findUserById(id)
        if (user && user.cart.length > 0) {
            const newUser = await user.populate({
                path: "cart",
                populate: { path: "product", model: "Product", select: "name description price" }
            })
            const cartItems = newUser.cart
            const newOrderItems = []
            newUser.cart.map(item => newOrderItems.push({
                product: item.product._id,
                quantity: item.quantity,
                total: item.product.price * item.quantity
            }))

            const subtotal = cartItems.reduce<number>((a, c) => {
                return a + Number(c.product.price) * Number(c.quantity)
            }, 0)


            const newOrder = new OrderModel({
                orderId: crypto.randomBytes(5).toString("hex"),
                owner: user._id,
                subtotal,
                items: newOrderItems
            })

            await newOrder.save()
            user.cart = []
            await user.save()

            return await newOrder.populate([{
                path: "items",
                populate: { path: "product", model: "Product", select: "name description price" }
            }, {
                path: "owner", select: "firstname lastname email"
            }])
        }
        return null
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function findUserOrders(owner) {
    try {
        const orders = await OrderModel
            .find({ owner })
            .select("-owner -__v -_id")
            .populate({ path: "items", populate: { path: "product", model: "Product", select: "name description price" } })
        return orders
    } catch (error) {
        throw new Error(error)
    }
}

export async function findAllOrders() {
    try {
        const orders = await OrderModel
            .find({})
            .select("-__v -_id")
            .populate([
                { path: "items", populate: { path: "product", model: "Product", select: "name description price" } },
                { path: "owner", select: "firstname lastname email" }
            ])
        return orders
    } catch (error) {
        throw new Error(error)
    }
}