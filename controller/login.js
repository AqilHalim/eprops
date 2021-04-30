const jwt = require('jsonwebtoken')
const md5 = require('md5')
const connection = require('../connection')
const User = require('../models/user')(connection)

const secret = process.env.JWT_SECRET || 'test'

const login = async function (req, res) {
    if (!(req.body.username && req.body.password)) {
        res.status(400).end()
        return
    }

    try {
        const user = await User.findOne({
            where: {
                username: req.body.username.trim().replace(/\s+/g, " "),
                password: md5(req.body.password)
            }
        })

        if (!user) {
            res.status(401).json({
                status: false,
                message: 'incorrect username or password'
            });
            return
        }

        let today = Math.floor(Date.now() / 1000);
        var exp = {
            expiresIn: 60 * 60
        }
        let payload = {
            iss: 'eprops',
            iat: today,
            expired: exp.expiresIn,
            id: user.id,
            nama: user.nama,
            email: user.email
        }
        const token = jwt.sign(payload, secret, exp)
        res.status(200).json({
            status: true,
            payload: payload,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terdapat Error: ' + error.message
        });
    }
}

module.exports = login