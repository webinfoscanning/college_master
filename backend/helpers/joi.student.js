const Joi = require("joi");
exports.AddUpdateStudent = Joi.object({
  institutionId: Joi.string().required().trim(),
  firstname: Joi.string().required().trim(),
  lastname: Joi.string().required().trim(),
  date: Joi.string().required().trim(),
  image: Joi.string(),
  castCerfificate: Joi.string(),
  birthCertificate: Joi.string(),
  // dob: Joi.date().min('1-1-0001').iso().required(),
  dob: Joi.string().required(),
  email: Joi.string().required().email().trim(),
  gender: Joi.string().required().trim(),
  aadhar: Joi.string().regex(/^[0-9]{12}$/).messages({'string.pattern.base': `Aadhar number must have 12 digits.`}),
  aadharUpload: Joi.string().trim(),
  placeOfBirth: Joi.string().trim(),
  bloodGroup: Joi.string().trim(),
  religion: Joi.required(),
  state: Joi.required(),
  city: Joi.required(),
  country: Joi.required(),
  classDegree: Joi.required(),
  department: Joi.required(),
  acedemicYear: Joi.required(),
  boardUniversity: Joi.required(),
  
  address: Joi.string().trim(),
  phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
});

exports.AddUpdateParents = Joi.object({
  stuId: Joi.string().required().trim(),
  institutionId: Joi.string().required().trim(),
  name: Joi.string().required().trim(),
  mobile: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Mobile number must have 10 digits.`}),
  email: Joi.string().email().trim(),
  aadhar: Joi.string().regex(/^[0-9]{12}$/).messages({'string.pattern.base': `Aadhar number must have 12 digits.`}),
  aadharUpload: Joi.string().allow(null, ''),
  panCard: Joi.string().allow(null, ''),
  education: Joi.string().allow(null, ''),
  occupation: Joi.string().allow(null, ''),
  address: Joi.string().required().trim(),
  // dob: Joi.date().min('1-1-0001').iso().required(),
  dob: Joi.string().trim().required(),
  photo: Joi.string().allow(null, ''),
  income: Joi.string().allow(null, ''),
  religion: Joi.required(),
  city: Joi.required(),
  state: Joi.required(),
  country: Joi.required(),
  parentType: Joi.string().valid("FATHER", "MOTHER").required(),
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
  // id: Joi.string().required().trim(),
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
  stuSection: Joi.string().required(),
});


exports.AddUpdateFeeCollection = Joi.object({
  stuId: Joi.string().required().trim(),
  idFeeStruMapWithStu: Joi.string().required().trim(),
  institutionId: Joi.string().required().trim(),
  paymentDetails: Joi.string().required(),
});

