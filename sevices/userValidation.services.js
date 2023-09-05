const Joi = require("joi");

// let newUserSchema = joi.object({
//   firstName: joi.string().required(),
//   lastName: joi.string().required(),
//   email: joi.string().email().required(),
//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
// });
let newUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

let newUserSchemaLogin = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

module.exports = {
  newUserSchema,
  newUserSchemaLogin,
};
