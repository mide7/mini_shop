import { Router } from "express"
import { createBrandSchema, patchBrandSchema } from "./../schema/brand.schema";
import validateRequest from "../middlewares/validateRequest.middleware"
import { deleteBrand, getBrands, getOneBrand, patchBrand, postBrand } from "../controllers/brands.controller";

const router = Router()

router.get("/", getBrands)

router.get("/:name", getOneBrand)

router.post("/", validateRequest(createBrandSchema), postBrand)

router.patch("/:id", validateRequest(patchBrandSchema), patchBrand)

router.delete("/:id", deleteBrand)


export default router;