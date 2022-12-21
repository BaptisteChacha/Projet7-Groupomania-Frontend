const contentSchema = require('../models/content-validate');
const Db = require('../services/db');
const { DateTime } = require("luxon");
const { all } = require('express/lib/application');
const multer = require('../middleware/multer-config');
const { response } = require('express');

// Creation d'un post
exports.createPost = (req, res, next) => {
    const connection = Db.get();
    const post = {
        contain: req.body.content,
        userId: req.auth.userId,
        date: DateTime.now().toFormat("yyyy-LL-dd HH:mm:ss"),
        imageURL: req.file ? req.file.filename : undefined
    };
    // On verifie que les entrées correspondent bien avec ce qui est défini dans JOI
    const result = contentSchema.validate(post, { allowUnknown: true });
    if (!result.error) {
        // On verifie qu'il n'y ai pas d'erreur, si c'est le cas on enregistre notre requête SQL dans une variable
        let sql = "INSERT INTO `post`(contain, user_id, picture, date) VALUES (?,?,?,?) ";
        // On remplace les points d'interogation de notre requête paramétrée par nos valeurs    
        const inserts = [post.contain, post.userId, post.imageURL, post.date];
        sql = connection.format(sql, inserts);
        // On execute notre requête SQL et on renvoi une promesse    
        connection.promise().query(sql)
            .then(() => res.status(201).json({ Message: 'post enregistré', status: true }))
            .catch(error => res.status(500).json({ error }));
    } else {
        res.status(400).json({ message: "ce post ne peut pas être publié", error: result.error })
    }
}

// Récupération des posts
exports.getAllContents = (req, res, next) => {
    const connection = Db.get();    
    let allContents = "SELECT post.*, user.username FROM post JOIN user ON user.id = user_id ORDER BY date DESC LIMIT ?, ?" ;
    let offset = [parseInt(req.query.offset ?? 0), parseInt(req.query.limit ?? 5)];
    allContents = connection.format(allContents, offset);
    let contentQuery = connection.promise().query(allContents);
    let count = "SELECT COUNT(*) AS counter FROM post";
    const countQuery = connection.promise().query(count);
    Promise.all([ contentQuery, countQuery ])
        .then((data) => {
            console.log(data)
            console.log(data[1][0][0].counter)
            const rows = data[0][0];
            for (let i in rows) {
                // Pour chaque entrée dans la BDD on vérifie si une image existe
                if (rows[i].picture != undefined) {
                    // Si oui on l'enregistre dans imageURL 
                    rows[i].imageURL = `${req.protocol}://${req.get('host')}/images/${rows[i].picture}`;
                }
            }
            return res.status(200).json({ posts: rows, counter: data[1][0][0].counter });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteContents = (req, res, next) => {
    const connection = Db.get(); 
    let deleteContents = "DELETE FROM `post` WHERE `id` = ? " ;
    let id = parseInt(req.query.id);
    console.log(req.query)
    deleteContents = connection.format(deleteContents, id);
    console.log(deleteContents)
    connection.promise().query(deleteContents)
    .then(() => res.status(200).json({ Message: 'post supprimé', status: true }))
    .catch(error => res.status(500).json({ error }));
}
