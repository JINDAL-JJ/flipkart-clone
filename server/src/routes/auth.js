const express = require('express');
const { signUp, signIn} = require('../controllers/auth');
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../validators/auth');
const router = express.Router();

router.post('/signIn',validateSignInRequest, isRequestValidated, signIn);

router.post('/signUp', validateSignUpRequest, isRequestValidated, signUp);


module.exports = router;