const doctorModel = require("../models/docModel");
const userModel = require("../models/userModel");

// get all users
const gettAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({
      success: true,
      message: "users data",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get all doc

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).json({
      success: true,
      message: "doctors data",
      data: doctors,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//
const changeAccountStatusCtrl = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    // const user = await userModel.findOne({ _id: doctor.userId });
    // const notification = doctor.notification;
    // notification.push({
    //   type: "doctor-account-request-updated",
    //   message: `Your Doctor Account Request Has ${status}`,
    //   onClickPth: "/notification",
    // });
    // user.isDoctor = status === "approved" ? true : false;

    await doctor.save();
    const doctors = await doctorModel.find({});
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctors,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { getAllDoctors, gettAllUsers, changeAccountStatusCtrl };
