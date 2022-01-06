import { Document, model, Schema } from "mongoose"
export interface ShippingDetails extends Document {
    ordererContact: string,
    fullname: string,
    address: string,
    city: string,
    country: string,
    state: string,
    phoneNumber: string
    postalCode?: string,
    apartment?: string,
}

export const shippingSchema = new Schema<ShippingDetails>({
    ordererContact: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
    },
    apartment: {
        type: String,
    },
})

const ShippingModel = model<ShippingDetails>("Shipping", shippingSchema)
export default ShippingModel