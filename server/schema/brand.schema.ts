import { object, string } from "yup";

export const createBrandSchema = object({
    body: object({
        name: string().required("Brand name is required"),
        description: string().required("A brand description is required")
    })
})

export const patchBrandSchema = object({
    params: object({
        id: string().required("Brand ID required").trim(),
    }),
    body: object({
        name: string(),
        description: string(),
    })
})