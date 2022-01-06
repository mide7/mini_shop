import { number, object, string } from "yup";

export const createShippingSchema = object({
    body: object({
        ordererContact: string().required("Your Email/Phone Number is required.").trim(),
        fullname: string().required("Fullname is required."),
        address: string().required("Delivery Address is required").trim(),
        city: string().required("City of delivery is required").trim(),
        country: string().required("Country of delivery is required.").trim(),
        state: string().required("State of delivery is required.").trim(),
        phoneNumber: string().required("Phone number is required").matches(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/g,
            "A valid phone number is required"
        ),
        postalCode: number(),
        apartment: string().trim(),
    })
})