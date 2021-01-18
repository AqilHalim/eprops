const connection = require('../koneksi')
const People = require('../models/people')(connection)
const Msg = require('../models/message')(connection)
const Notice = require('../models/noticeboard')(connection)

Msg.hasOne(Notice, {
    foreignKey: 'id_message'
})
Notice.belongsTo(Msg, {
    foreignKey: 'id_message'
})
People.hasMany(Notice, {
    foreignKey: 'id_people'
})
Notice.belongsTo(People, {
    foreignKey: 'id_people'
})

//menampilkan semua data
exports.getAll = async function (req, res) {
    try {
        const notice = await Msg.findAll()
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            total: notice.length,
            data: notice
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
        const notice = await Msg.findOne({
            where: {
                id_message: req.params.id
            }
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: notice
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    }
}

//menambahkan data
exports.postOne = async function (req, res) {
    try {
        const notice = await Msg.create(req.body)
        const id = notice.id_message
        var member = notice.penerima
        if (member != null) {
            for (var i = 0; i < member.length; i++) {
                await Notice.create({
                    id_message: id,
                    id_people: member[i]
                })
            }
        }
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success '
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
        const msg = await Msg.findOne({
            where: {
                id_message: req.body.id_message
            }
        })
        var penerima = msg.penerima
        if (penerima == null) {
            await Msg.update(req.body, {
                where: {
                    id_message: req.body.id_message
                }
            })
            const id = req.body.id_message
            var member = req.body.penerima
            for (var i = 0; i < member.length; i++) {
                await Notice.create({
                    id_message: id,
                    id_people: member[i]
                })
            }
            res.status(200).json({
                message: 'Anda Berhasil',
                status: 'success'
            })
        } else {
            res.status(200).json({
                message: 'Anda Tidak Bisa Mengedit Pesan',
                status: 'failed'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    }
}