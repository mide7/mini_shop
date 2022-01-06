import { Router } from "express"
import { getShippingDetails, postShippingDetails, postOrderProduct } from "../controllers/purchase.controller"
import validateRequest from "../middlewares/validateRequest.middleware"
import { createShippingSchema } from "./../schema/shipping.schema";

const router = Router()

router.get("/shipping-details/:id", getShippingDetails)

router.post("/shipping-details/:id", validateRequest(createShippingSchema), postShippingDetails)

router.post("/order/:id", postOrderProduct)

export default router