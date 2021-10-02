import { NextFunction, Request, Response } from "express"
export default function (req: Request, res: Response, next: NextFunction) {
    if (!req.session.isLoggedIn) {
        res.status(401).json({ message: "Unauthorized!" })
    }
    next()
}