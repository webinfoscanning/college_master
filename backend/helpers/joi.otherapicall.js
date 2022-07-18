const Joi = require("joi");
exports.PostalCode = Joi.object({
  //   pincode: Joi.string().required(),
  pincode: Joi.string()
    .regex(/^[0-9]{6}$/)
    .messages({ "string.pattern.base": `Zip Code must have 6 digits.` })
    .required(),
});
