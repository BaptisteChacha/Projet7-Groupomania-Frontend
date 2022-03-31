const Joi = require('joi');

const contentSchema = Joi.object({
    contain: Joi.string().alphanum().min(3).max(500).required()
});

module.exports = contentSchema