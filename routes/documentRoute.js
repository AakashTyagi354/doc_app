const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createDocuments,
  getDocuments,
  deleteDocument,
} = require("../controllers/documentController");

const router = express.Router();

// get all users
// router.get("/getAllUser", authMiddleware, gettAllUsers);
router.post("/create-document", authMiddleware, createDocuments);
router.post("/getall-document", authMiddleware, getDocuments);
router.post("/getall-document-users", getDocuments);
router.post("/delete-document", authMiddleware, deleteDocument);

module.exports = router;
