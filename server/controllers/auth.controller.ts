import { DocumentDefinition } from "mongoose";
import { Request, Response } from "express"
import { createUser, findUserByEmail } from "../services/user.services"
import { OAuth2Client } from "google-auth-library"
import { omit } from "lodash"
import { User } from "../models/users.model";

const client = new OAuth2Client(process.env.googleAuthClientID)

export const postUser = async (req: Request, res: Response) => {
    try {
        let user = await findUserByEmail(req.body.email)
        if (user) {
            return res.status(406).json({ message: "Email Already taken!" })
        }
        user = await createUser(req.body)
        return res.status(201).json({ data: omit(user.toJSON(), ["password", "__v", "_id"]), message: "User successfully created!" })
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

export const postLogin = async (req: Request, res: Response) => {
    console.log("csrf token:", req.body._csrf)
    try {
        let user = await findUserByEmail(req.body.email)
        const validUser = user && await user.comparePassword(req.body.password)
        if (!validUser) {
            return res.status(401).json({ message: "Incorrect Email or Password" })
        }
        // console.log(req.session);
        req.session.isLoggedIn = true
        res.status(200).json({ data: omit(user.toJSON(), ["password", "__v", "_id"]) })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const postLogout = async (req: Request, res: Response) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(400).json({ message: error.message })
        } else {
            res.status(200).json({ message: "Loggged out successfully" })
        }
    })
}

export const postGoogleAuth = async (req: Request, res: Response) => {
    const { tokenId } = req.body
    try {
        const googleRes = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.googleAuthClientID
        })

        const googleResPayload = googleRes.getPayload()

        console.log(googleResPayload)

        const { email_verified, email, given_name, family_name } = googleResPayload

        if (email_verified) {
            let user = await findUserByEmail(email)

            if (user) {
                req.session.isLoggedIn = true
                return res.status(200).json({ data: omit(user.toJSON(), ["password", "__v", "_id"]) })
            }

            const userToCreate = {
                email,
                password: `${given_name}${process.env.googleAccountPassword}`,
                comparePassword: `${given_name}${process.env.googleAccountPassword}`,
                firstname: given_name,
                lastname: family_name,
                createdAt: undefined,
                updatedAt: undefined
            }
            user = await createUser(userToCreate)
            return res.status(201).json({ data: omit(user.toJSON(), ["password", "__v", "_id"]), message: "User successfully created!" })
        }


    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}