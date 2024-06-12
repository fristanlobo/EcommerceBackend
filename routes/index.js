const express = require("express");

const router = express.Router();


const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require('../middleware/authToken');
const userLoggout = require("../controller/userLoggout");


router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get('/user-details', authToken, userDetailsController)
router.get("/userlogout", userLoggout)

module.exports = router;

//npm run dev
//guravsneha@gmail.com
//sneha123