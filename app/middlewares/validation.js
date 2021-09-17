//Validate Login Credentials.
const Joi = require("joi");

//Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(6).required(),
  });
  return schema.validate(data, { abortEarly: false });
};

//Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data, { abortEarly: false });
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
