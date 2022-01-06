import { Router } from "express"
import { postUser, postLogin, postLogout, postGoogleAuth } from "../controllers/auth.controller"
import { createUserSchema, loginUserSchema, googleAuthSchema } from "./../schema/user.schema";
import validateRequest from "../middlewares/validateRequest.middleware"

const router = Router()

router.post("/signup", validateRequest(createUserSchema), postUser)

router.post("/login", validateRequest(loginUserSchema), postLogin)

router.post("/logout", postLogout)

router.post("/google", validateRequest(googleAuthSchema), postGoogleAuth)

export default router;