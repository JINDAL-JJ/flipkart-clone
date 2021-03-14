const express = require('express');
const { requireSignIn, userMiddleWare } = require('../common-middleware');
const router = express.Router();
const { addItemToCart } = require('../controllers/cart');

router.post('/addToCart',requireSignIn, userMiddleWare, addItemToCart);
// router.get('/getCategory', getCategory);

module.exports = router;
