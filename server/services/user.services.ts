import { DocumentDefinition } from "mongoose";
import UserModel, { User, UserInput } from "../models/users.model";

export async function createUser(input: DocumentDefinition<UserInput>) {
    try {
        return await UserModel.create(input)
    } catch (error) {
        throw new Error(error)
    }
}

export async function findUserByEmail(email: string) {
    try {
        return await UserModel.findOne({ email: email })
    } catch (error) {
        throw new Error(error)
    }
}

export async function findUserById(id: string) {
    try {
        return await UserModel.findById(id)
    } catch (error) {
        throw new Error(error)
    }
}

export async function findUserByIdWithCart(id: string) {
    try {
        return await UserModel
            .findById(id)
            .populate({
                path: "cart",
                populate: { path: "product", model: "Product", select: "name description" }
            })
    } catch (error) {
        throw new Error(error)
    }
}
