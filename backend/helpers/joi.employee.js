const Joi = require("joi");
exports.AddUpdateEmployee = Joi.object({
  institutionId: Joi.string().required().trim(),
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  nickName: Joi.string().required().trim(),
  email: Joi.string().required().trim(),
  photo: Joi.string(),
  department: Joi.string().required().trim(),
  location: Joi.string().required().trim(),
  title: Joi.string().required().trim(),
  reportingTo: Joi.string().required().trim(),
  sourceOfHire: Joi.string().required().trim(),
  dateOfJoining: Joi.string().required().trim(),
  seatingLocation: Joi.string().required().trim(),
  employeeStatus: Joi.string().required().trim(),
  workPhone: Joi.string().required().trim(),
  employeeType: Joi.string().required().trim(),
  extension: Joi.string().required().trim(),
  role: Joi.string().required().trim(),
  panNo: Joi.string().required().trim(),
  dob: Joi.string().required().trim(),
  personalAddress: Joi.string().required().trim(),
  residentialAddress: Joi.string().required().trim(),
  maritalStatus: Joi.string().required().trim(),
  jobDescription: Joi.string().required().trim(),
  summaryAddress: Joi.string().required().trim(),
  aboutMe: Joi.string().required().trim(),
  gender: Joi.string().required().trim(),
  dateOFExit: Joi.string().allow(null, ''),
  workingHours: Joi.string().required().trim(),
  workexperience: Joi.string().trim(),
  education: Joi.string().trim(),
  dependent: Joi.string().trim(),
});

exports.AddUpdateExperience = Joi.object({
  empRefId: Joi.string().required().trim(),
  institutionId: Joi.string().required().trim(),
  preCompName: Joi.string().required().trim(),
  jobTitle: Joi.string().required().trim(),
  fromDate: Joi.string().required().trim(),
  toDate: Joi.string().required().trim(),
  jobDescription: Joi.string().required().trim(),
});

exports.AddUpdateEducation = Joi.object({
  empRefId: Joi.string().required().trim(),
  institutionId: Joi.string().required().trim(),
  collageName: Joi.string().required().trim(),
  diplomaDegree: Joi.string().required().trim(),
  fieldOfStudy: Joi.string().required().trim(),
  dateOfCompletion: Joi.string().required().trim(),
  additionalNotes: Joi.string().required().trim(),
  interested: Joi.string().required().trim(),
  aggregate: Joi.string().required().trim(),
});

exports.AddUpdateDependent = Joi.object({
  empRefId: Joi.string().required().trim(),
  institutionId: Joi.string().required().trim(),
  name: Joi.string().required().trim(),
  relationship: Joi.string().required().trim(),
  dob: Joi.string().required().trim(),
});

exports.CheckInstitutionId = Joi.object({
  institutionId: Joi.string().required().trim(),
});

exports.CheckParams = Joi.object({
  id: Joi.string().required().trim(),
});

exports.CheckInstitutionAndEmpRefId = Joi.object({
  institutionId: Joi.string().required().trim(),
  empRefId: Joi.string().required().trim(),
});

