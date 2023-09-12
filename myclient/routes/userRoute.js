const express = require('express');
const { login, loginCtrl, registerController, authCtrl,userAppointmentsCtrl ,bookingAvailiblityCtrl,applyDoctorCtrl,getAllNotificationCtrl,deleteAllNotificationCtrl,getAllDoctorsCtrl, bookAppointmentCtrl} = require('../controllers/userCtrl');
const authMiddleware = require('../middleware/authMiddleware');



const router = express.Router();

// login POST
router.post('/login',loginCtrl)
// register POST
router.post('/register',registerController)


// auth POST
router.post('/getUserData',authMiddleware,authCtrl)

// apply doc POST
router.post('/apply-doctor',authMiddleware,applyDoctorCtrl)

// notificatio  POST
router.post('/get-all-notification',authMiddleware,getAllNotificationCtrl)

// notificatio  POST
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationCtrl)

// get all doctor
router.get('/getAllDoctors',getAllDoctorsCtrl)

// book a appointment
router.post('/book-appointment',authMiddleware,bookAppointmentCtrl)


// booking aviablity
router.post('/booking-availbility', authMiddleware,bookingAvailiblityCtrl)

// appointment list
router.get('/user-appointments',authMiddleware,userAppointmentsCtrl)

module.exports = router