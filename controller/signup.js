const jwt = require('jsonwebtoken')
const md5 = require('md5')
const connection = require('../connection')
const User = require('../models/user')(connection)

const secret = process.env.JWT_SECRET || 'test'

const signup = async function (req, res) {
    if (!req.body) {
        res.status(400).end();
        return
    }

    try {
        const user = await User.count({
            where: {
                username: req.body.username.trim().replace(/\s+/g, " "),
                email: req.body.email
            }
        })

        if (user) {
            res.status(401).json({
                status: false,
                massage: 'duplicate username or email'
            })
            return
        }

        const new_user = await User.create({
            username: req.body.username,
            password: md5(req.body.password),
            nama: req.body.nama,
            email: req.body.email,
            createdAt: new Date()
        })

        let today = Math.floor(Date.now() / 1000);
        var exp = {
            expiresIn: 60 * 60
        }
        let payload = {
            iss: 'eprops',
            iat: today,
            expired: exp.expiresIn,
            id: new_user.id,
            nama: new_user.nama,
            email: new_user.email,
        }
        const token = jwt.sign(payload, secret, exp)
        res.status(200).json({
            status: true,
            payload: payload,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Terdapat Error: ' + error.message,
            status: false
        });
    }
}

module.exports = signup