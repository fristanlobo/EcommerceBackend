const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String
}, {
    timestamps: true
})

const userModal = mongoose.model("user", userSchema);

module.exports = userModal;