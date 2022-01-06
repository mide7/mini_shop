import { Product } from "./products.model";
import { Document, model, Schema } from "mongoose"

export interface Cart extends Document {
    product: Product,
    quantity: number
}

export interface CartInput extends Cart {
    owner: string
}

export const cartSchema = new Schema<Cart>({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const CartModel = model<Cart>("Cart", cartSchema)

export default CartModel