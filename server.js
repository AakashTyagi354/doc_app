const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path =  require('path');
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

// static file
app.use(express.static(path.join(__dirname,'./myclient/build')));
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname,'./myclient/build/index.html'));
})


app.listen(process.env.PORT || 7001, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
