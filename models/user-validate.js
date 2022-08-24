const Joi = require('joi');

    const userSchema = Joi.object({
    lastname: Joi.string().min(3).alphanum().max(16).required().messages(
      {
        'string.min' : "Votre nom doit contenir au moins 3 caractères",
        'string.max' : "Votre nom doit contenir moins de 16 caractères",
        'string.alphanum' : "Votre nom doit contenir seulement des caractères alphanumériques",
        'string.empty' : "le champ nom de famille n'est pas valide"
      }
    ),
    firstName: Joi.string().alphanum().min(3).max(16).required().messages(
      {
        'string.min' : "Votre prénom doit contenir au moins 3 caractères",
        'string.max' : "Votre prénom doit contenir moins de 16 caractères",
        'string.alphanum' : "Votre prénom doit contenir seulement des caractères alphanumériques",
        'string.empty' : "le champ prénom n'est pas valide"
      }
    ),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required().messages(
      {
        'string.min' : "Votre mot de passe doit contenir au moins 6 caractères",
        'string.empty' : "le champ mot de passe n'est pas valide",
        'string.pattern.base' : "La valeur du mot de passe n'est pas valide"
      }
    ),
    userName : Joi.string().alphanum().min(3).max(16).required().messages(
      {
        'string.min' : "Votre nom d'utilisateur doit contenir au moins 3 caractères",
        'string.max' : "Votre nom d'utilisateur doit contenir moins de 16 caractères",
        'string.alphanum' : "Votre nom d'utilisateur doit contenir seulement des caractères alphanumériques",
        'string.empty' : "le champ nom d'utilisateur n'est pas valide"
      }
    ),
    email : Joi.string().email({ tlds: { allow: false } }).required()
  });

  module.exports = userSchema