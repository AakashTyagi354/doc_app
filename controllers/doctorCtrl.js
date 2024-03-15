const doctorModel = require("../models/docModel");
const appoinmentModel = require("../models/appoinmentModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const appointmentModel = require("../models/appoinmentModel");

// login

const doctorLogin = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ email: req.body.email });
    if (!doctor) {
      return res.status(200).send({
        success: false,
        message: "Doctor Not Found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, doctor.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or  Password",
      });
    }
    if (doctor.status === "pending") {
      return res.status(200).send({
        success: false,
        message: "Doctor Not Found",
      });
    }
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1D",
    });
    res.status(200).send({
      success: true,
      message: "Login Sucessfully",
      doctor,
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

const getAllDoctors = async (req, res) => {
  try {
    // Assuming you have a method like `find` to retrieve all doctors from the database
    const doctors = await doctorModel.find();
    console.log(doctors);

    // Send the retrieved doctors as a response
    res.status(200).send({
      success: true,
      message: "All doctors fetched successfully",
      data: doctors, // Use plural `doctors` instead of `doctor`
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in fetching all doctors",
    });
  }
};

const getDoctorInfoCtrl = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor details fetched successfully",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      error,
      message: "error is fetching doc details",
    });
  }
};

// update doct profile
const updateProfileCtrl = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "doctor profile updated successfully",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "error in updateing doc prfile",
    });
  }
};

const getDoctorByIdCtrl = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "doctor details fetched successfully",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "error in fetching doctor details",
    });
  }
};
const doctorAppointmentsCtrl = async (req, res) => {
  try {
    // const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appoinment = await appoinmentModel.find({
      doctorId: req.body.doctorId,
    });
    res.status(200).send({
      success: true,
      message: "doctor appointments fetched successfully",
      data: appoinment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "error in fetching doctor appointments",
    });
  }
};

const updateStatusCtrl = async (req, res) => {
  try {
    const { appoinmentId, status } = req.body;
    const appoinments = await appoinmentModel.findByIdAndUpdate(appoinmentId, {
      status,
    });

    const user = await userModel.findOne({ _id: appoinments.userId });
    const notification = user.notification;

    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onClickPath: "/user/appoinments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "status updated successfully",
      data: appoinments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "error in updating status",
    });
  }
};

module.exports = {
  getDoctorInfoCtrl,
  updateProfileCtrl,
  getDoctorByIdCtrl,
  doctorAppointmentsCtrl,
  updateStatusCtrl,
  getAllDoctors,
  doctorLogin,
};
