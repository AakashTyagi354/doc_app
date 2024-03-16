const express = require("express");
const {
  categoryController,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("./../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//routes
// create category
router.post("/create-category", authMiddleware, createCategoryController);

//update category
router.post("/update-category/:id", updateCategoryController);

//getAll category
router.get("/get-category", categoryController);

//single category
router.get("/single-category/:slug", singleCategoryController);
router.post("/delete-category/:id", deleteCategoryController);

//delete category
// router.delete("/delete-category/:id", authMiddleware, deleteCategoryCOntroller);

module.exports = router;
