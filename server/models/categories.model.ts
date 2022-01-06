import { model, Schema } from "mongoose"

export interface Category extends Document{
    name: string,
}

const categorySchema = new Schema<Category>({
    name: {
        type: String,
        lowercase:true,
        required: true,
    },
}, { timestamps: true })

const CategoryModel = model<Category>("Category", categorySchema)

export default CategoryModel