import { object, string } from "yup";

export const createProductSchema = object({
    body: object({
        name: string().required("Product name is required"),
        description: string().required("A product description is required"),
        brand: string().required("Product brand is required"),
        category: string().required("Product category is required"),
    })
})

export const patchProductSchema = object({
    params: object({
        id: string().required("Brand ID required").trim(),
    }),
    body: object({
        name: string(),
        description: string(),
        brand: string(),
        category: string(),
    })
})