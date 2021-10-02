import { object, string } from "yup";

export const createCategorySchema = object({
    body: object({
        name: string().required("Category name is required"),
    })
})

export const patchCategorySchema = object({
    params: object({
        id: string().required("Category ID required").trim(),
    }),
    body: object({
        name: string(),
    })
})