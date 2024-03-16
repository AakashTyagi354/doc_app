const Razorpay = require("razorpay");

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
dotenv.config();

// connecting to db
connectDB();

// rest object
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// routs
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/admin", require("./routes/adminRoute"));
app.use("/api/v1/doctor", require("./routes/doctorRoute"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/product", require("./routes/productRoutes"));
app.use("/api/v1/payment", require("./routes/paymentRoute.js"));
app.use("/api/v1/documents", require("./routes/documentRoute.js"));
// static file
app.use(express.static(path.join(__dirname, "./myclient/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./myclient/build/index.html"));
});

// exports.instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });
// console.log(this.instance.orders)

app.listen(process.env.PORT || 7001, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
