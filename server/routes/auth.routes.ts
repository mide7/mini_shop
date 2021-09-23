import { Router } from "express"
import { postUser, postLogin } from "../controllers/auth.controller"
import { createUserSchema, loginUserSchema } from "./../schema/user.schema";
import validateRequest from "../middlewares/validateRequest.middleware"

const router = Router()

router.post("/signup", validateRequest(createUserSchema), postUser)

router.post("/login", validateRequest(loginUserSchema), postLogin)

export default router;