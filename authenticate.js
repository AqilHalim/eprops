const jwt = require("jsonwebtoken")
const connection = require('./connection')
const User = require('./models/user')(connection)

const secret = process.env.JWT_SECRET || "test"

const authenticate = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({
            status: false,
            message: 'Anda Belum Login'
        })
        return
    }

    const token = req.headers.authorization.split(" ")[1]
    try {
        jwt.verify(token, secret)
    } catch (error) {
        res.status(401).json({
            status: false,
            message: error.message
        });
        return
    }

    next()
}

module.exports = authenticate