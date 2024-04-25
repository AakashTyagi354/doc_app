const express = require("express");
const formidable = require("express-formidable");
const {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
  addressController,
} = require("../controllers/productController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

//routes
router.post(
  "/create-product",
  authMiddleware,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  authMiddleware,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:id", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);
router.post("/add-address", authMiddleware, addressController);

//payments routes
//token
// router.get("/braintree/token", braintreeTokenController);

// //payments
// router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

module.exports = router;
