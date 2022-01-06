import { Router } from "express"
import { createCategorySchema, patchCategorySchema } from "./../schema/category.schema";
import validateRequest from "../middlewares/validateRequest.middleware"
import { deleteCategory, getCategories, getOneCategory, patchCategory, postCategory } from "../controllers/categories.controller";

const router = Router()

router.get("/", getCategories)

router.get("/:name", getOneCategory)

router.post("/", validateRequest(createCategorySchema), postCategory)

router.patch("/:id", validateRequest(patchCategorySchema), patchCategory)

router.delete("/:id", deleteCategory)


export default router;