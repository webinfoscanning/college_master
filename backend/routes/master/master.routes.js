const masterRoutes = require("express").Router();
const MasterController = require("../../controllers/master/master.controller");
const { verifyauth } = require('../../service/jwtauth.service');
// const GoogleAPI = require("../../controllers/google.api");

const {checkMasterDataAccess} = require("../../service/masteraccess.control");

/* master data */
masterRoutes.get("/list", checkMasterDataAccess ,MasterController.AllMaster); //verifyauth
masterRoutes.post("/add", MasterController.CreateMaster);
masterRoutes.put("/update/:id", MasterController.UpdateMaster);
masterRoutes.delete("/delete/:id", MasterController.DeleteMaster);


/* master sub data */
masterRoutes.get("/listsubvalue/:id", MasterController.AllMasterSubValue);
masterRoutes.put("/addsubvalue/:id", MasterController.AddUpdateMasterSubValue);
// masterRoutes.delete("/deletesubvalue/:id", MasterController.DeleteMasterSubValue);




module.exports = masterRoutes;
