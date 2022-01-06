import { model, Schema } from "mongoose"

export interface Brand extends Document{
    name: string,
    description: string
}

const brandSchema = new Schema<Brand>({
    name: {
        type: String,
        lowercase:true,
        required: true,
    },
    description: {
        type: String
    }
}, { timestamps: true })

const BrandModel = model<Brand>("Brand", brandSchema)

export default BrandModel