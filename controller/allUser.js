const userModal = require("../models/userModel");

async function allUsers(req,res) {
    try {
        const allUser= await userModal.find()
       res.json({
        message:"All user Details ",
        data:allUser,
        success:true,
        error:false
       })
    }
    catch (e) {
        res.status(400).json({
            message: err,
            error: true,
            success: false,
        })
    }
}

module.exports=allUsers;