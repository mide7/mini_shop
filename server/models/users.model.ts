import { Document, model, Schema } from "mongoose"
import bcrypt from "bcrypt"


export interface User extends Document {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<User>({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
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

export default UserModel