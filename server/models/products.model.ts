import { Document, model, Schema } from "mongoose"

export interface Product extends Document {
    _id?: Schema.Types.ObjectId,
    name: string,
    brand: Schema.Types.ObjectId,
    description: string,
    createdAt?: Date,
    updatedAt?: Date
}

const productSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brands",
        required: true
    },
    description: {
        type: String,
    }
}, { timestamps: true })

const ProductModel = model<Product>("Product", productSchema)

export default ProductModel