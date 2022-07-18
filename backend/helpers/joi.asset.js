const Joi = require("joi");
exports.AddUpdateAsset = Joi.object({
  institutionId: Joi.string().required().trim(),
  category: Joi.string().required().trim(), 
  product: Joi.string().required().trim(), 
  document: Joi.string().required().trim(), 
  agreement: Joi.string().required().trim(), 
});

exports.CheckInstitutionId = Joi.object({
  institutionId: Joi.string().required().trim(),
});

exports.CheckParams = Joi.object({
  id: Joi.string().required().trim(),
});
