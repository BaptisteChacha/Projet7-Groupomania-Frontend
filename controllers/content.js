const contentSchema = require('../models/content-validate');
const Db = require('../services/db');
const { DateTime } = require("luxon");
const { all } = require('express/lib/application');
const multer = require('../middleware/multer-config')

exports.createPost = (req, res, next) => {
    const connection = Db.get();
    const post = {
        contain: req.body.content,
        userId: req.auth.userId,
        date: DateTime.now().toFormat("yyyy-LL-dd HH:mm:ss"),
        imageURL: req.file ? req.file.filename : undefined
    };
    const result = contentSchema.validate(post, { allowUnknown: true });
    if (!result.error) {
      //  console.log(result)
        let sql = "INSERT INTO `post`(contain, user_id, picture, date) VALUES (?,?,?,?) ";
        const inserts = [post.contain, post.userId, post.imageURL, post.date];
        sql = connection.format(sql, inserts);
        connection.promise().query(sql)
            .then(() => res.status(201).json({ Message: 'post enregistré', status: true}))
            .catch(error => res.status(500).json({ error }));
    } else {
        res.status(400).json({ message: "ce post ne peut pas être publié", error: result.error })
    }
}


exports.getAllContents = (req, res, next) => {
    const connection = Db.get();
    let allContents = "SELECT * FROM post LIMIT ?, ?";
    let offset = [parseInt(req.query.offset ?? 0), parseInt(req.query.limit ?? 5)];
    allContents = connection.format(allContents, offset);
    connection.promise().query(allContents)
        .then(([rows, fields]) => {
            for(let i in rows) {
                rows[i].imageURL = `${req.protocol}://${req.get('host')}/images/${rows[i].imageURL}`;
            }
            return res.status(201).json({ posts: rows });
        })
        .catch(error => res.status(500).json({ error }));
}
