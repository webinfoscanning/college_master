const FeeRoutes = require("express").Router();
const FeeController = require("../../controllers/fee/fee.controller");
// const GoogleAPI = require("../../controllers/google.api");


/* fee data */
FeeRoutes.get("/list", FeeController.AllFee);
FeeRoutes.get("/getdata/:id", FeeController.getFeeById);
FeeRoutes.post("/add", FeeController.CreateFee);
FeeRoutes.put("/update/:id", FeeController.UpdateFee);
FeeRoutes.delete("/delete/:id", FeeController.DeleteFee);


/* fee sub data */
FeeRoutes.get("/listsubvalue/:id", FeeController.AllFeeSubValue);
FeeRoutes.put("/addsubvalue/:id", FeeController.AddUpdateFeeSubValue);
FeeRoutes.delete("/deletesubvalue/:id", FeeController.DeleteFeeSubValue);






module.exports = FeeRoutes;
