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
  updateAppoitment,
  clearAllNotification,
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

router.post("/clear-all-notifications", clearAllNotification);

// // get all doctor
// router.get("/getAllDoctors", getAllDoctorsCtrl);

// book a appointment
router.post("/book-appointment", authMiddleware, bookAppointmentCtrl);

// booking aviablity
router.post("/booking-availbility", authMiddleware, bookingAvailiblityCtrl);

// appointment list
router.post("/user-appointments", authMiddleware, userAppointmentsCtrl);
router.post("/update-appointment", authMiddleware, updateAppoitment);

module.exports = router;
