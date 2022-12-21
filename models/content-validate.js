const Joi = require('joi');

const contentSchema = Joi.object({
    contain: Joi.string().min(3).max(500).required().messages(
        {
            'string.empty' : "le champ description ne peut pas être vide"
        }
    )
});

module.exports = contentSchema