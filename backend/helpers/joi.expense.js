const Joi = require("joi");
exports.AddUpdateExpense = Joi.object({
  institutionId: Joi.string().required().trim(),
  expType: Joi.string().required().trim(),
  expAmount: Joi.string().required().trim(),
  expTowordsAccount: Joi.string().required().trim(),
  expDate: Joi.string().required().trim(),
  refNumber: Joi.string().required().trim(),
  paymentBy: Joi.string().required().trim(),
  paymentMode: Joi.string().required().trim(),
  venderName: Joi.string().required().trim(),
});

exports.CheckInstitutionId = Joi.object({
  institutionId: Joi.string().required().trim(),
});

exports.CheckParams = Joi.object({
  id: Joi.string().required().trim(),
});
