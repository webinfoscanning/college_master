const Joi = require("joi");
exports.AddUpdateMap = Joi.object({
  institutionId: Joi.string().required(),
  classId: Joi.required(),
  department: Joi.required(),
  academicYear: Joi.required(),
  section: Joi.required(),
  board: Joi.required(),
});

exports.CheckInstitutionId = Joi.object({
  institutionId: Joi.string().required().trim(),
});

exports.AddMapValue = Joi.object({
  institutionId: Joi.string().required().trim(),
  id: Joi.string().required().trim(),
});

exports.CheckParams = Joi.object({
  id: Joi.string().required().trim(),
});

exports.JsonSubjectDetails = Joi.object({
  institutionId: Joi.string().required().trim(),
  subjectDetails: Joi.required(),
});

exports.JsonHeaderIndex = Joi.object({
  index: Joi.string().required().trim(),
});
exports.CheckQueryForDelete = Joi.object({
  institutionId: Joi.string().required().trim(),
  index: Joi.string().required().trim(),
});
exports.AddFacultyToSubject = Joi.object({
  empRefId: Joi.string().required(),
  institutionId: Joi.string().required().trim(),
  mappedSubject: Joi.required(),
});

exports.CheckInstitutionIdWithSub = Joi.object({
  institutionId: Joi.string().required().trim(),
  subToRemoveFromFaculty: Joi.string().required().trim(),
});

exports.CheckInstitutionIdWithNewSub = Joi.object({
  institutionId: Joi.string().required().trim(),
  subToRemoveFromFaculty: Joi.string().required().trim(),
  subToAddInFaculty: Joi.string().required(),
});
