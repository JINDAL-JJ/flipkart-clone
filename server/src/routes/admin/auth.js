const express = require('express');
const { signUp, signIn, signOut } = require('../../controllers/admin/auth');
const { isRequestValidated, validateSignUpRequest, validateSignInRequest } = require('../../validators/auth');
const { requireSignIn } = require('../../common-middleware');
const router = express.Router();

router.post('/signIn',validateSignInRequest, isRequestValidated,  signIn);
router.post('/signUp',validateSignUpRequest, isRequestValidated, signUp);
router.post('/signOut', requireSignIn, signOut);

module.exports = router;