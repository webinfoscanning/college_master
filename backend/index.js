const express = require("express");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const createErrors = require("http-errors");
// const fileUpload = require("express-fileupload");
const helmet = require("helmet");

// master routes
const masterRoutes = require("./routes/master/master.routes");

// student routes
const studentRoutes = require("./routes/student/student.routes");

// fee routes
const feeRoutes = require("./routes/fee/fee.routes");

// fee routes
const mapRoutes = require("./routes/map/map.routes");

// user routes
const userRoutes = require("./routes/user/user.routes");

// employee routes
const employeeRoutes = require("./routes/employee/employee.routes");

// asset routes
const assetRoutes = require("./routes/asset/asset.routes");

// expense routes
const expenseRoutes = require("./routes/expense/expense.routes");

// school registration routes
const registrationRoutes = require("./routes/registration/register.routes");

// timetable routes
const timetableRoutes = require("./routes/timetable/timetable.routes");

const otherapicallRoutes = require("./routes/otherapicall/otherapicall.routes");

const PORT = process.env.PORT || 5500;
const app = express();

// const corsOption = {
//   origin: "*",
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// }

app.use(helmet());
//parse the requests
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

//midleware for fileupload
// app.use(fileUpload());

//set static view
app.use(express.static('public')); 
app.use('/assets/images', express.static('assets/images'));

// app.use("/assets/images", express.static("/assets/images"));

//starting page
app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Collage Management System"});
});

//master routes
app.use("/api/master", masterRoutes);

//student routes
app.use("/api/student", studentRoutes);

//map routes
app.use("/api/map", mapRoutes);


//fee routes
app.use("/api/fee", feeRoutes);

//fee routes
app.use("/api/user", userRoutes);

//employee routes
app.use("/api/employee", employeeRoutes);

//asset routes
app.use("/api/asset", assetRoutes);


//expense routes
app.use("/api/expense", expenseRoutes);

//registration routes
app.use("/api/registration", registrationRoutes);


//timetable routes
app.use("/api/timetable", timetableRoutes);


//other api call routes
app.use("/api/otherapicall", otherapicallRoutes);



//middleware for parsing the error
app.use((req, res, next) => {
  next(createErrors.NotFound("NOT FOUND!"));
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      status: error.status || 500,
      message: error.message || "Resource not found!",
    },
  });
});

app.listen(PORT, () => console.log(`server started...`));
