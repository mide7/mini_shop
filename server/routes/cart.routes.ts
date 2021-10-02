import { Router } from "express"
import { addToCartSchema, removeFromCartSchema } from "./../schema/cart.schema";
import validateRequest from "../middlewares/validateRequest.middleware"
import { postCart, getCart, deleteCartItem } from "../controllers/cart.controller";

const router = Router()

router.get("/:id", getCart)

router.post("/", validateRequest(addToCartSchema), postCart)

router.delete("/", validateRequest(removeFromCartSchema),deleteCartItem)


export default router;