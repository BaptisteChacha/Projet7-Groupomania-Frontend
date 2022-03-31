const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')

module.exports = router;

const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);