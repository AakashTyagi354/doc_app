const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/docModel");
const appointmentModel = require("../models/appoinmentModel");
const moment = require("moment");

// register
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login
const loginCtrl = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User Not Exist",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or  Password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1D",
    });
    res.status(200).send({
      success: true,
      message: "Login Sucessfully",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `Login Controller ${err.message}`,
    });
  }
};

const authCtrl = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User Not Exist",
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `auth Controller ${err.message}`,
    });
  }
};

// apply doc

const applyDoctorCtrl = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pendling" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doc account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res
      .status(201)
      .send({ message: "Apply Doctor Sucessfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `apply doc  ${err.message}`,
    });
  }
};

// notification ctrl

const getAllNotificationCtrl = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;

    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `getAllNotificationCtrl error ${err.message}`,
    });
  }
};

const deleteAllNotificationCtrl = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "all notification deleted ",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `deleteAllNotificationCtrl error ${err.message}`,
    });
  }
};

// get all doc
const getAllDoctorsCtrl = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      data: doctors,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `getAllDoctorsCtrl error ${err.message}`,
    });
  }
};

// book apoinment
const bookAppointmentCtrl = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-Appointment-Request",
      message: `a new appoinment request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appoinments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "appoinment booked successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `bookAppointmentCtrl error ${err.message}`,
    });
  }
};

// booking available
const bookingAvailiblityCtrl = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const formTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointment = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: formTime,
        $lte: toTime,
      },
    });
    if (appointment.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Appointment Already Booked",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointment Available",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `bookingAvailiblityCtrl error ${err.message}`,
    });
  }
};

// ao appointment list
const userAppointmentsCtrl = async (req, res) => {
  try {
    const appointment = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      data: appointment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `userAppointmentsCtrl error ${err.message}`,
    });
  }
};

module.exports = {
  loginCtrl,
  registerController,
  authCtrl,
  applyDoctorCtrl,
  getAllNotificationCtrl,
  deleteAllNotificationCtrl,
  getAllDoctorsCtrl,
  bookAppointmentCtrl,
  bookingAvailiblityCtrl,
  userAppointmentsCtrl,
};
