const connection = require('../koneksi')
const People = require('../models/people')(connection)
const Msg = require('../models/message')(connection)
const Send = require('../models/feedback')(connection)
const Status = require('../models/status_feedback')(connection)

Msg.hasOne(Send, {
    foreignKey: 'id_message'
})
Send.belongsTo(Msg, {
    foreignKey: 'id_message'
})
People.hasMany(Send, {
    foreignKey: 'id_people'
})
Send.belongsTo(People, {
    foreignKey: 'id_people'
})
Status.hasOne(Send, {
    foreignKey: 'id_feedback'
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
        for (var i = 0; i < member.length; i++) {
            await Send.create({
                id_message: id,
                id_people: member[i],
                tanggalkirim: new Date()
            })
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

//mengubah data process
exports.putOneProcess = async function (req, res) {
    try {
        await Send.update({ tanggalproses: new Date() }, {
            where: {
                id_people: req.params.id
            }
        })
        await Status.create({
            id_feedback: req.params.id,
            status: req.body.status,
            id_user: req.body.id_user
        })
        res.status(200).json({
            message: 'Anda Berhasil Update',
            status: 'success'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    }
}

//mengubah data finish
exports.putOneFinish = async function (req, res) {
    try {
        await Send.update({ tanggalselesai: new Date() }, {
            where: {
                id_people: req.params.id
            }
        })
        res.status(200).json({
            message: 'Anda Berhasil Update',
            status: 'success'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    }
}

//mengubah data read
exports.putOneRead = async function (req, res) {
    try {
        await Send.update({ tanggalbaca: new Date() }, {
            where: {
                id_people: req.params.id
            }
        })
        res.status(200).json({
            message: 'Anda Berhasil Update',
            status: 'success'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    }
}