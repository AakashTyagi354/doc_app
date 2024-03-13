const express = require("express");
const {
  login,
  loginCtrl,
  registerController,
  getDoctors,
  authCtrl,
  userAppointmentsCtrl,
  bookingAvailiblityCtrl,
  applyDoctorCtrl,
  getAllNotificationCtrl,
  deleteAllNotificationCtrl,
  getAllDoctorsCtrl,
  bookAppointmentCtrl,
  adminLogin,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// login POST
router.post("/login", loginCtrl);

//admin login POST
router.post("/admin-login", adminLogin);
// register POST
router.post("/register", registerController);

router.get("/get-doctors", getDoctors);

// auth POST
router.post("/getUserData", authMiddleware, authCtrl);

// apply doc POST
router.post("/apply-doctor", applyDoctorCtrl);

// notificatio  POST
router.post("/get-all-notification", authMiddleware, getAllNotificationCtrl);

// notificatio  POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationCtrl
);

// // get all doctor
// router.get("/getAllDoctors", getAllDoctorsCtrl);

// book a appointment
router.post("/book-appointment", authMiddleware, bookAppointmentCtrl);

// booking aviablity
router.post("/booking-availbility", authMiddleware, bookingAvailiblityCtrl);

// appointment list
router.get("/user-appointments", authMiddleware, userAppointmentsCtrl);

module.exports = router;
