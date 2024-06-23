const express = require("express");

const router = express.Router();


const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require('../middleware/authToken');
const userLoggout = require("../controller/userLoggout");
const allUsers = require("../controller/allUser");
const updateUserDetail = require("../controller/updateUser");


router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get('/user-details', authToken, userDetailsController)
router.get("/userlogout", userLoggout)
router.post("/update-user",updateUserDetail)

//admin panel
router.get("/all-user",allUsers)

module.exports = router;

//npm run dev
//guravsneha@gmail.com
//sneha123