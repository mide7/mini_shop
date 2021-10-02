import { object, string, number } from "yup";

export const addToCartSchema = object({
    body: object({
        owner: string().required("UserId required"),
        product: string().required("Product is required"),
        quantity: number().required("Product quantity is required")
    })
})

export const removeFromCartSchema = object({
    body: object({
        owner: string().required("UserId required"),
        product: string().required("Product is required"),
    })
})