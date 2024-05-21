const userModal = require("../models/userModel");

async function userDetailsController(req, res) {
    try {
        const user = await userModal.findById(req.userId)
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message:"User Details"
        })
    }
    catch (err) {
        res.status(400).json({
            message: err,
            error: true,
            success: false,
        })
    }
}
module.exports = userDetailsController;