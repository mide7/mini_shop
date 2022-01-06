import { Router } from "express"
import { createProductSchema, patchProductSchema } from "./../schema/product.schema";
import validateRequest from "../middlewares/validateRequest.middleware"
import { getProducts, postProduct, deleteProduct, getOneProduct, patchProduct } from "../controllers/products.controller"

const router = Router()

router.get("/", getProducts)

router.get("/:id", getOneProduct)

router.post("/", validateRequest(createProductSchema), postProduct)

router.patch("/:id", validateRequest(patchProductSchema), patchProduct)

router.delete("/:id", deleteProduct)

export default router;