const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Db = require('../services/db');
require('dotenv').config();
const userSchema = require('../models/user-validate');
const formatError = require('../services/utils');


exports.signup = (req, res, next) => {
  const connection = Db.get();
  const user = {
    ...req.body
  };
  console.log(user)
  const result = userSchema.validate(user, {abortEarly: false});
  if (!result.error) {

    let singleEmail = "SELECT COUNT(*) AS counter FROM user WHERE `email` = ? "
    singleEmail = connection.format(singleEmail, [req.body.email])
    connection.promise().query(singleEmail)
      .then(([rows, fields]) => {
        console.log(rows)
        if (rows[0].counter != 0) {
          res.status(400).json(formatError("Cette adresse mail est deja utilisée"))
        } else {

          bcrypt.hash(user.password, 10)
            .then(hash => {
              user.password = hash
              let sql = "INSERT INTO `user`(last_name, first_name, password, username, email) VALUES (?,?,?,?,?) ";
              const inserts = [user.lastname, user.firstName, user.password, user.userName, user.email];
              sql = connection.format(sql, inserts);
              connection.promise().query(sql)
                .then(() => res.status(201).json({ message: 'Compte crée avec succès' , status: true }))
                .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        }
      });

  } else {
    res.status(500).json({ message: "Un champ du formulaire n'est pas valide", error: result.error })
  }
};


exports.login = (req, res, next) => {
  const connection = Db.get();
  let loginQuery = "SELECT * FROM user WHERE `email` = ? ";
  loginQuery = connection.format(loginQuery, [req.body.email]);
  connection.promise().query(loginQuery)
    .then(([rows, fields]) => {
      const user = rows[0];
      //console.log(req.body.email)
      if (!user) {
        return res.status(401).json({ error: 'Identifiants incorrect' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Identifiants incorrect' });
          }
          res.status(200).json({
            token: jwt.sign(
              { id: user.id },
              process.env.KEY,
              { expiresIn: '24h' }
            ),
            user: user
          });
        })
    })
    .catch(error => res.status(500).json({ error }));
};