const Joi = require("joi");
exports.AddUpdateRegister = Joi.object({
//   institutionId: Joi.string().required().trim(),
  name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  address: Joi.string().required(),
  email: Joi.string().required().email().trim(),
  phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
});


exports.CheckInstitutionId = Joi.object({
  institutionId: Joi.string().required().trim(),
});

exports.AddHeaderValue = Joi.object({
  institutionId: Joi.string().required().trim(),
  id: Joi.string().required().trim(),
});

exports.CheckParams = Joi.object({
  id: Joi.string().required().trim(),
});

exports.CheckQueryForDelete = Joi.object({
  institutionId: Joi.string().required().trim(),
  index: Joi.string().required().trim(),
});

exports.AddUpdateStudentPhone = Joi.object({
  institutionId: Joi.string().required().trim(),
  id: Joi.string().required().trim(),
  phone: Joi.string().required().trim().min(10).max(10),
});

exports.studentPhoneDetailInQuery = Joi.object({
  institutionId: Joi.string().required().trim(),
  refid: Joi.string().required().trim(),
});

exports.IdstudentPhone = Joi.object({
  phone: Joi.string().required().trim(),
});

exports.SearchStudent = Joi.object({
  institutionId: Joi.string().required().trim(),
  searchfield: Joi.string().required().trim(),
});
exports.StuAppliFeeStruMap = Joi.object({
  institutionId: Joi.string().required().trim(),
  stuAppliFormRefId: Joi.string().required().trim(),
  feeStruRefId: Joi.string().required().trim(),
});

