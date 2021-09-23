import { DocumentDefinition } from "mongoose";
import UserModel, { User } from "../models/users.model";

export async function createUser(input: DocumentDefinition<User>) {
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
