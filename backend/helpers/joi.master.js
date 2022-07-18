const Joi = require("joi");
exports.AddUpdateMaster = Joi.object({
  institutionId: Joi.string().required().trim(),
  name: Joi.string().required().trim(),
  description: Joi.string().trim(),
});

exports.CheckInstitutionId = Joi.object({
  institutionId: Joi.string().required().trim(),
  page: Joi.string().trim(),
});


exports.AddHeaderValue = Joi.object({
  institutionId: Joi.string().required().trim(),
  id: Joi.string().required().trim(),
});

exports.CheckParams = Joi.object({
  id: Joi.string().required().trim(),
});

exports.JsonHeaderValue = Joi.object({
  institutionId: Joi.string().required().trim(),
  headerValue:Joi.required(),
});

exports.JsonHeaderIndex = Joi.object({
  index: Joi.string().required().trim(),
});
exports.CheckQueryForDelete = Joi.object({
  institutionId: Joi.string().required().trim(),
  index: Joi.string().required().trim(),
});



