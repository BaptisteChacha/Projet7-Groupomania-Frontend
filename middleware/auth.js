const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.KEY);
        const userId = decodedToken.id;
        req.auth = { userId }

        next();
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifié' });
    }
};