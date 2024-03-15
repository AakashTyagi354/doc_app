const express = require("express");
const {
  categoryController,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} = require("./../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//routes
// create category
router.post("/create-category", authMiddleware, createCategoryController);

//update category
router.put("/update-category/:id", authMiddleware, updateCategoryController);

//getAll category
router.get("/get-category", categoryController);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
// router.delete("/delete-category/:id", authMiddleware, deleteCategoryCOntroller);

module.exports = router;
