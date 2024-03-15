const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    languages: {
      type: Array,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    feesPerCunsaltation: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
