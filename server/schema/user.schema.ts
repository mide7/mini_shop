import { object, string, ref } from "yup";

export const createUserSchema = object({
    body: object({
        firstname: string().required("Firstname is required"),
        lastname: string().required("Lastname is required"),
        email: string().email("Must be a valid email address").required("Email address is required"),
        password: string().required("Password is required").min(6, "Password too short, should be minimum 6 characters"),
        confirmPassword: string().required("Confirm password is required").oneOf([ref("password"), null], "Password and Confirm password must match")
    })
})

export const loginUserSchema = object({
    body: object({
        email: string().email("Must be a valid email address").required("Email address is required"),
        password: string().required("Password is required").min(6, "Password too short, should be minimum 6 characters"),
    })
})