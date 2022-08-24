const Joi = require('joi');

const contentSchema = Joi.object({
    contain: Joi.string().alphanum().min(3).max(500).required().messages(
        {
            'string.empty' : "le champ description ne peut pas être vide",
            'string.alphanum' : "Le champ description contient des caractères qui ne sont pas acceptés"
        }
    )
});

module.exports = contentSchema