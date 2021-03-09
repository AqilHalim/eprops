const connection = require('../connection')
const Unit = require('../models/unit.js')(connection)

//menampilkan semua data
exports.getAll = async function (req, res) {
    try {
        const unit = await Unit.findAll()
        res.status(200).json({
            message: 'success',
            status: true,
            data: unit
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        });
    }
}

//menampilkan berdasarkan id
exports.getOne = async function (req, res) {
    try {
        const unit = await Unit.findOne({
            where: {
                id_people: req.params.id
            }
        })
        if (!unit) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        res.status(200).json({
            message: 'success',
            status: true,
            data: unit
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}

//mengubah data
exports.putOne = async function (req, res) {
    try {
        const unit = await Unit.findOne({
            where: {
                id_people: req.params.id
            }
        })
        if (!unit) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        await Unit.update(req.body, {
            where: {
                id_people: req.params.id
            },
        })
        res.status(200).json({
            message: 'success',
            status: true
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}