import { Document, model, Schema } from "mongoose"

export interface Product extends Document {
    _id?: string,
    name: string,
    brand: Schema.Types.ObjectId,
    category: Schema.Types.ObjectId,
    description: string,
}

const productSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
    }
}, { timestamps: true })

const ProductModel = model<Product>("Product", productSchema)

export default ProductModel