const Joi = require("joi");

exports.AddUpdateFee = Joi.object({
  institutionId: Joi.string().required().trim(),
  description: Joi.string().max(255).trim(),
  classDegree: Joi.required(), 
  department: Joi.required(), 
  fee: Joi.number().required(), 
  feeType: Joi.required(), 
  academicYear: Joi.required(), 
  boardUniversity: Joi.required(), 
});

exports.CheckInstitutionId = Joi.object({
  institutionId: Joi.string().required().trim(),
});

exports.AddFeeValue = Joi.object({
  institutionId: Joi.string().required().trim(),
  id: Joi.string().required().trim(),
});

exports.CheckParams = Joi.object({
  id: Joi.string().required().trim(),
});

exports.JsonFeeValue = Joi.object({
  institutionId: Joi.string().required().trim(),
  feeValue: Joi.required(),
});

exports.JsonHeaderIndex = Joi.object({
  index: Joi.string().required().trim(),
});
exports.CheckQueryForDelete = Joi.object({
  institutionId: Joi.string().required().trim(),
  // id: Joi.string().required().trim(),
  index: Joi.string().required().trim(),
});
