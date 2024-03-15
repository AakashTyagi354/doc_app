const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDoctorInfoCtrl,
  updateProfileCtrl,
  getDoctorByIdCtrl,
  doctorAppointmentsCtrl,
  updateStatusCtrl,
  getAllDoctors,
  doctorLogin,
} = require("../controllers/doctorCtrl");

const router = express.Router();

// single doc info
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoCtrl);
router.post("/doctor-login", doctorLogin);

// single doc info
router.post("/getDoctors", getAllDoctors);

// post update profile
router.post("/updateProfile", authMiddleware, updateProfileCtrl);

// get doc

router.post("/getDoctorById", authMiddleware, getDoctorByIdCtrl);

// get appoinment
router.post("/doctor-appointments", authMiddleware, doctorAppointmentsCtrl);

// post update status

router.post("/update-status", authMiddleware, updateStatusCtrl);

module.exports = router;
