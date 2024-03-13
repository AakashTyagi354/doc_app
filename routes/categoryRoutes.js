import express from "express";

import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//routes
// create category
router.post("/create-category", authMiddleware, createCategoryController);

//update category
router.put("/update-category/:id", authMiddleware, updateCategoryController);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete("/delete-category/:id", authMiddleware, deleteCategoryCOntroller);

export default router;
