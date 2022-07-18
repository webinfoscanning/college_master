const timetableRoutes = require("express").Router();
const TimetableController = require("../../controllers/timetable/timetable.controller");
const { verifyauth } = require('../../service/jwtauth.service');

// const {checkMasterDataAccess} = require("../../service/masteraccess.control");

/* timetable data */
timetableRoutes.get("/list", TimetableController.AllTimetable); //verifyauth
timetableRoutes.post("/add", TimetableController.CreateTimetable);
timetableRoutes.put("/update/:id", TimetableController.UpdateTimetable);
timetableRoutes.delete("/delete/:id", TimetableController.DeleteTimetable);

timetableRoutes.get("/getdata/:id", TimetableController.getTimetableById);

module.exports = timetableRoutes;
