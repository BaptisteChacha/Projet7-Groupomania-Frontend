const contentSchema = require('../models/content-validate');
const Db = require('../services/db');
const { DateTime } = require("luxon");
const { all } = require('express/lib/application');
const multer = require('../middleware/multer-config')

exports.createPost = (req, res, next) => {
    const connection = Db.get();
    const post = {
        contain: JSON.parse(req.body.data).contain,
        userId: req.auth.userId,
        date: DateTime.now().toFormat("yyyy-LL-dd HH:mm:ss"),
        imageURL: req.file.filename
    };
    const result = contentSchema.validate(post, { allowUnknown: true });
    if (!result.error) {
        let sql = "INSERT INTO `post`(contain, user_id, picture, date) VALUES (?,?,?,?) ";
        const inserts = [post.contain, post.userId, post.imageURL, post.date];
        sql = connection.format(sql, inserts);
        connection.promise().query(sql)
            .then(() => res.status(201).json({ Message: 'post enregistré' }))
            .catch(error => res.status(500).json({ error }));
    } else {
        res.json({ message: "ce post ne peut pas être publié", error: result.error })
    }
}


exports.getAllContents = (req, res, next) => {
    const connection = Db.get();
    let allContents = "SELECT * FROM post LIMIT ?, ?";
    let offset = [parseInt(req.query.offset) ?? 0, parseInt(req.query.limit)];
    allContents = connection.format(allContents, offset);
    connection.promise().query(allContents)
        .then(([rows, fields]) => {
            return res.status(201).json({ posts: rows });
        })
        .catch(error => res.status(500).json({ error }));
}
/*while(post.length > 0) {
    `${req.protocol}://${req.get('host')}/images/${post.imageURL}`
}*/
