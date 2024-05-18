const userModal = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }
        const user = await userModal.findOne({ email })
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password)
            const tokenData={
                _id:user._id,
                username:user.email
            }
            if (checkPassword) {
                jwt.sign( tokenData , process.env.TOKEN_SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
                    if (err) {
                        res.status(400).json({
                            message: err,
                            error: true,
                            success: false,
                        })
                    }
                    else {
                        const tokenOption = {
                            httpOnly: true,
                            secure: true,
                        }
                        res.cookie("token", token, tokenOption).status(200).json({
                            message: "Login Successfully",
                            data: token,
                            user: user,
                            success: true,
                            error: false
                        })

                    }
                });
            }
            else {
                res.status(400).json({
                    message: "Incorect Password",
                    error: true,
                    success: false,
                })
            }
        }
        else {
            res.status(400).json({
                message: "User not Found! Please provide correct username",
                error: true,
                success: false,
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignInController;