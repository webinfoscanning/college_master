const Joi = require("joi");
exports.AddUpdateTimetable = Joi.object({
  institutionId: Joi.string().required().trim(),
  classDegree: Joi.string().required().trim(),
  department: Joi.string().required().trim(),
  section: Joi.string().required().trim(),
  acadimicYear: Joi.string().required().trim(),
  subject: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  event: Joi.string().required().trim(),
  location: Joi.string().required().trim(),
  notes: Joi.string().trim(),
  colorcode: Joi.string().trim(),
  duration: Joi.string().required().trim(),
  reminder: Joi.string().required().trim(),
  eventSet: Joi.string(),
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

