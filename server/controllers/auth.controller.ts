import { Request, Response } from "express"
import { createUser, findUserByEmail } from "../services/user.services"
import { omit } from "lodash"

export const postUser = async (req: Request, res: Response) => {
    try {
        let user = await findUserByEmail(req.body.email)
        if (user) {
            return res.status(406).json({ message: "Email Already taken!" })
        }
        console.log("continued")
        user = await createUser(req.body)
        return res.status(201).json({ data: omit(user.toJSON(), ["password", "__v", "_id"]), message: "User successfully created!" })
    } catch (error) {
        // console.error(error.message)
        return res.status(409).json({ message: error.message })
    }
}

export const postLogin = async (req: Request, res: Response) => {
    try {
        let user = await findUserByEmail(req.body.email)
        const validUser = user && await user.comparePassword(req.body.password)
        if (!validUser) {
            return res.status(401).json({ message: "Incorrect Email or Password" })
        }
        res.status(200).json({ data: omit(user.toJSON(), ["password", "__v", "_id"]) })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}