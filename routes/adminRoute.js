const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { gettAllUsers, getAllDoctors,changeAccountStatusCtrl } = require("../controllers/adminCtrl");
const router = express.Router();

// get all users
router.get("/getAllUser", authMiddleware, gettAllUsers);

// get all doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctors);

// post account status
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusCtrl);

module.exports = router;
