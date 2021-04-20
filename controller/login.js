const jwt = require("jsonwebtoken")
const connection = require('../connection')
const User = require('../models/user')(connection)

const secret = process.env.JWT_SECRET || "test"

const login = async function (req, res) {
    if (!(req.body.username && req.body.password)) {
        res.status(400).end();
        return
    }

    if (req.body.username) {
        try {
            const user = await User.count({
                where: {
                    username: req.body.username.trim().replace(/\s+/g, " "),
                    password: req.body.password
                }
            })
            if (!user) {
                res.status(401).json({
                    status: false
                });
                return
            }
        } catch (error) {
            res.status(500).json({
                message: 'Terdapat Error: ' + error.message,
                status: false
            });
        }
    }

    let today = Math.floor(Date.now() / 1000);
    let exp = {
        expiresIn: 20
    }
    let payload = {
        iss: 'eprops',
        iat: today,
        expired: exp.expiresIn + " seconds"
    }

    const token = jwt.sign(payload, secret, exp)
    res.status(200).json({
        status: true,
        payload: payload,
        token: token,
    });
}

module.exports = login