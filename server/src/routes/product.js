const express = require('express');
const { requireSignIn, adminMiddleWare } = require('../common-middleware');
const { createProduct } = require('../controllers/product');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb (null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb) {
        cb (null, shortid.generate() + '-' + file.originalname);
    }
})

const upload = multer({ storage });
// const { addCategory, getCategory } = require('../controllers/category');

router.post('/create',requireSignIn, adminMiddleWare, upload.array('productPicture'), createProduct);


// router.get('/getCategory', getCategory);

module.exports = router;
