const MapRoutes = require("express").Router();
const MapController = require("../../controllers/map/map.controller");
// const GoogleAPI = require("../../controllers/google.api");


/* Map data */
MapRoutes.get("/list", MapController.AllMap);
MapRoutes.post("/add", MapController.CreateMap);
MapRoutes.put("/update/:id", MapController.UpdateMap);
MapRoutes.delete("/delete/:id", MapController.DeleteMap);


/* Map sub data */
MapRoutes.get("/listsubvalue/:id", MapController.AllSubjectDetails);
MapRoutes.put("/addsubjectdetails/:id", MapController.AddUpdateSubjectDetails);
MapRoutes.delete("/deletesubject/:id", MapController.DeleteSubjectDetails);

MapRoutes.get("/classlist", MapController.listAllClasses);

MapRoutes.get("/getallsubjects", MapController.listOfAllSubjects);


MapRoutes.post("/mapfactosub", MapController.MapFacultyToSubject);
MapRoutes.get("/faclisttomapwithsub", MapController.FacultyListToMapWithSubject);
MapRoutes.get("/submappedwithfac", MapController.SubjectMappedWithFaculty);
MapRoutes.delete("/remsubfromfac/:id", MapController.RemoveSubjectFromAlreadyMappedWithFaculty);
MapRoutes.put("/editsubtofac/:id", MapController.EditSubjectInAlreadyMappedFaculty);




module.exports = MapRoutes;
