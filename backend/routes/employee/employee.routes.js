const empRoutes = require("express").Router();
const EmpController = require("../../controllers/employee/employee.controller");
const { verifyauth } = require('../../service/jwtauth.service');

const fileUploadController = require("../../controllers/fileupload/fileupload.controller");
const upload = require('../../service/upload');

const {checkMasterDataAccess} = require("../../service/masteraccess.control");

/* employee data */
empRoutes.get("/list", checkMasterDataAccess ,EmpController.AllEmployee); //verifyauth
empRoutes.post("/add", EmpController.CreateEmployee);
empRoutes.put("/update/:id", EmpController.UpdateEmployee);
empRoutes.delete("/delete/:id", EmpController.DeleteEmployee);

empRoutes.get("/getdata/:id", EmpController.getEmployeeById);

empRoutes.post("/fileupload", upload.single("photo") , fileUploadController.fileUpload);



module.exports = empRoutes;
