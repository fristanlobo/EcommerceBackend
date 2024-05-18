async function authToken() {
    try {
        const token = req.cookies?.token || req.header;
        console.log("token", token)
    }
    catch (err) {
        res.status(400).json({
            message: err,
            error: true,
            success: false,
        })
    }
}

module.exports = authToken;