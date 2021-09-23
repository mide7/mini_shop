import { Router } from "express"
import { getAllProducts, postProduct } from "../controllers/products.controller"

const router = Router()

router.get("/", getAllProducts)

router.post("/", postProduct)

export default router;