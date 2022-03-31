const Joi = require('joi');

    const userSchema = Joi.object({
    lastName: Joi.string().alphanum().min(3).max(16).required(),
    firstName: Joi.string().alphanum().min(3).max(16).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
    userName : Joi.string().alphanum().min(3).max(16).required(),
    email : Joi.string().email({ tlds: { allow: false } }).required()
  });

  module.exports = userSchema