import { model, Schema } from "mongoose"

export interface Brand{
    name: string,
}

const brandSchema = new Schema<Brand>({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const BrandModel = model<Brand>("Brand", brandSchema)

export default BrandModel