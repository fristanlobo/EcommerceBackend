const userModal = require("../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;
        if (!email) {
            throw new Error("Please Provide email");
        }
        if (!password) {
            throw new Error("Please Provide password");
        }
        if (!name) {
            throw new Error("Please Provide name");
        }
        const exisEmail = await userModal.findOne({ email })

        if (!exisEmail) {
            const salt = bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(password, salt)
            if (!hash) {
                throw new Error("Something is wrong!")
            }
            else {
                const payload = {
                    ...req.body,
                    role: "GENERAL",
                    password: hash
                }

                const userData = new userModal(payload);
                const saveUser = await userData.save();
                res.status(201).json({
                    data: saveUser,
                    success: true,
                    error: false,
                    message: 'User created successfully'
                })
            }
        }
        else {
            res.status(400).json({
                message: "Email already exist",
                error: true,
                success: false,
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err,
            error: true,
            success: false,
        })
    }

}

module.exports = userSignUpController;