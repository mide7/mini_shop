import { Product } from "./products.model";
import { Document, model, Schema } from "mongoose"
import bcrypt from "bcrypt"

export interface UserInput {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
}

export interface User extends Document {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    cart: Cart[]
    comparePassword(candidatePassword: string): Promise<boolean>
}

export interface Cart extends Document {
    product: Product,
    quantity: number
}

export interface CartInput extends Cart {
    owner: string
}

const cartSchema = new Schema<Cart>({
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

const userSchema = new Schema<User>({
    firstname: {
        type: String,
        required: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [cartSchema]
}, { timestamps: true })

userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this as User
    return bcrypt.compare(candidatePassword, user.password).then(result => result).catch(e => false)
}

userSchema.virtual("fullname").get(function () {
    return `${this.firstname} ${this.lastname}`
})

userSchema.pre("save", async function (next) {
    let user = this as User

    // only hash the password  if it has been modified (or it's new)
    if (!user.isModified("password")) return next()

    const salt = await bcrypt.genSalt(+process.env.SALT)

    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash

    return next()
})

const UserModel = model<User>("User", userSchema)
export const CartModel = model<Cart>("Cart", cartSchema)

export default UserModel