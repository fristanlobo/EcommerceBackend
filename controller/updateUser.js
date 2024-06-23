const userModal = require("../models/userModel");

async function updateUserDetail(req, res) {
    try {
        const sessionUser = await req.body.userId;
        const { userId, email, name, role } = req.body
        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }),
        }
        
        const user = await userModal.findById(sessionUser);
        const updateUser = await userModal.findByIdAndUpdate(userId, payload)
        if (user) {
            res.json({
                data: updateUser,
                message: 'User updated succesfully',
                error: false,
                success: true,
            })
        }
        else {
            res.json({
                //data:updateUser,
                message: 'User Not found',
                error: true,
                success: false,
            })
        }
    }
    catch (err) {
        console.log('e===',err)
        res.status(400).json({
            message: err,
            error: true,
            success: false,
        })
    }
}
module.exports = updateUserDetail;