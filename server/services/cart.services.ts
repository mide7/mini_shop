import CartModel, { CartInput } from "../models/cart.model";
import { findUserById, findUserByIdWithCart } from "./user.services";

export async function addProductToCart(input: CartInput) {
    try {
        const user = await findUserById(input.owner)
        if (user) {
            const existingProductIndex = user.cart.findIndex(x => x.product == input.product)
            console.log("index", existingProductIndex)
            if (existingProductIndex >= 0) {
                console.log("quantity 1", input.quantity)
                user.cart[existingProductIndex].quantity = input.quantity
                await user.save()
                const newUser = await user.populate({
                    path: "cart",
                    populate: { path: "product", model: "Product", select: "name description" }
                })
                return newUser.cart
            } else {
                console.log("quantity 2", input.quantity)
                const newCart = new CartModel({
                    product: input.product,
                    quantity: input.quantity
                })
                user.cart.push(newCart)
                await user.save()
                const newUser = await user.populate({
                    path: "cart",
                    populate: { path: "product", model: "Product", select: "name description" }
                })
                return newUser.cart
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function getUserCart(id: string) {
    try {
        const user = await findUserByIdWithCart(id)
        if (user) {
            return user.cart
        }
        return []
    } catch (error) {
        throw new Error(error)
    }
}

export async function removeCartItem(input: CartInput) {
    try {
        const user = await findUserById(input.owner)
        console.log(user.cart[0].product)
        if (user) {
            const productIndex = await user.cart.findIndex(x => x.product == input.product)
            const product = await user.cart[productIndex]
            await product.remove()
            await user.save()
            const newUser = await user.populate({
                path: "cart",
                populate: { path: "product", model: "Product", select: "name description" }
            })
            return newUser.cart
        }
        return null
    } catch (error) {
        throw new Error(error)
    }
}
