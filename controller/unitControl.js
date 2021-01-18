const connection = require('../koneksi')
const Unit = require('../models/unit.js')(connection)

//menampilkan semua data
exports.getAll = async function (req, res) {
    try {
        const unit = await Unit.findAll()
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: unit
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
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
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: unit
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    }
}

//mengubah data
exports.putOne = async function (req, res) {
    try {
        await Unit.update(req.body, {
            where: {
                id_people: req.params.id
            },
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    }
}