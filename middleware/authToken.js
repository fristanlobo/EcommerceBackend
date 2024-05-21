const jwt = require('jsonwebtoken');
async function authToken(req, res, next) {
    try {
        const token = req.headers.cookie;
        const tokenarr = token.split("=")[1];
        if (!tokenarr) {
            return res.status(200).json({
                message: "User not Login",
                error: true,
                success: false
            })
        }
        else {
            jwt.verify(tokenarr, process.env.TOKEN_SECRET_KEY, (err, decode) => {
                if (err) {
                    res.status(400).json({
                        message: err.message || err,
                        data: [],
                        error: true,
                        success: false,
                    })
                }
                else {
                    req.userId = decode.tokenData._id
                    next();
                }
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}

module.exports = authToken;