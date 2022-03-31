const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const contenuCtrl = require('../controllers/content');

router.post('/createPost', auth, multer, contenuCtrl.createPost);
router.get('/getAllContents', auth, contenuCtrl.getAllContents);

module.exports = router;