const OtherApiCallRoutes = require("express").Router();
const OtherApiCallController = require("../../controllers/otherapicall/otherapicall.controller");


/* Other Api Call data */
OtherApiCallRoutes.get("/getdetailbypincode/:pincode", OtherApiCallController.getAreaDetailsByPinCode);

module.exports = OtherApiCallRoutes;
