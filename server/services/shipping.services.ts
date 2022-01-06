import ShippingModel, { ShippingDetails } from "../models/shipping.model";
import { findUserById, findUserShippingDetails } from "./user.services";

export async function getUserShippingDetails(id: string) {
    try {
        const user = await findUserShippingDetails(id)
        if (user) {
            return user.shippingDetails
        }
        return {}
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateUserShippingDetails(input: ShippingDetails, id: string) {
    try {
        const user = await findUserById(id)
        if (user) {
            const newShippingDetails = new ShippingModel({
                ordererContact: input.ordererContact,
                fullname: input.fullname,
                address: input.address,
                city: input.city,
                country: input.country,
                state: input.state,
                phoneNumber: input.phoneNumber,
                postalCode: input.postalCode,
                apartment: input.apartment,
            })
            user.shippingDetails = newShippingDetails
            await user.save()
            const newUser = await user.populate({ path: "shippingDetails" })
            return newUser.shippingDetails
        }
        return {}
    } catch (error) {
        throw new Error(error)
    }
}

