const studentRoutes = require("express").Router();
const StudentController = require("../../controllers/student/student.controller");

const fileUploadController = require("../../controllers/fileupload/fileupload.controller");
const upload = require('../../service/upload');






/* student data */
studentRoutes.get("/list", StudentController.AllStudent);
studentRoutes.get("/list/:id", StudentController.StudentById);
studentRoutes.post("/add", StudentController.CreateStudent);
studentRoutes.put("/update/:id", StudentController.UpdateStudent);
studentRoutes.delete("/delete/:id", StudentController.DeleteStudent);

studentRoutes.post("/parentdetails", StudentController.CreateUpdateStudentPatents);

studentRoutes.post("/addnewphone", StudentController.AddStudentNewPhone);
studentRoutes.put("/updatephone/:id", StudentController.UpdateStudentPhone);

studentRoutes.get("/search", StudentController.FindStudentDetails);

studentRoutes.get("/getstualldetail/:id", StudentController.GetStudentAllDetailsById);
studentRoutes.get("/getstudetamapwithfee/:id", StudentController.GetStudentMappedDetailsById);
studentRoutes.get("/getfeesturforstu/:id", StudentController.GetFeeStruListAsPerClaDepAceBordForStudent);

studentRoutes.get("/studetfeecollbyadmissid/:id", StudentController.GetStudentDetailForFeeCollectionByAdmissionId);


studentRoutes.post("/mapfee", StudentController.StuAppliFeeStrucMap);

studentRoutes.post("/collectfee", StudentController.CollectFeeOfStudent);



studentRoutes.post("/fileupload", upload.single("image") , fileUploadController.fileUpload);
studentRoutes.post("/birthcerti", upload.single("birthCertificate") , fileUploadController.fileUpload);
studentRoutes.post("/castcerti", upload.single("castCerfificate") , fileUploadController.fileUpload);
studentRoutes.post("/aadharcard", upload.single("aadharupload") , fileUploadController.fileUpload);



studentRoutes.post("/stuparentimage", upload.single("photo") , fileUploadController.fileUpload);
studentRoutes.post("/stuparentaadhar", upload.single("aadharupload") , fileUploadController.fileUpload);
studentRoutes.post("/stuparentpan", upload.single("pancard") , fileUploadController.fileUpload);




module.exports = studentRoutes;
