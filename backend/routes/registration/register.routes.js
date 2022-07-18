const registerRoutes = require("express").Router();
const RegisterController = require("../../controllers/registration/register.controller");

// const fileUploadController = require("../../controllers/fileupload/fileupload.controller");
// const upload = require('../../service/upload');






/* registration data */
registerRoutes.get("/list", RegisterController.AllRegister);
registerRoutes.get("/list/:id", RegisterController.getRegisterById);
registerRoutes.post("/add", RegisterController.CreateRegister);
registerRoutes.put("/update/:id", RegisterController.UpdateRegister);
registerRoutes.delete("/delete/:id", RegisterController.DeleteRegister);
registerRoutes.put("/maintenance/:id", RegisterController.UnderMaintenance);

module.exports = registerRoutes;
