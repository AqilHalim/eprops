const connection = require('../koneksi')
const People = require('../models/people')(connection)
const Notice = require('../models/notice')(connection)
const Send = require('../models/send_feedback')(connection)
const Status = require('../models/status_feedback')(connection)

Notice.hasOne(Send, {
    foreignKey: 'id_notice'
})
Send.belongsTo(Notice, {
    foreignKey: 'id_notice'
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
        const notice = await Notice.findAll()
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
        const notice = await Notice.findOne({
            where: {
                id_notice: req.params.id
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
        const notice = await Notice.create(req.body)
        const id = notice.id_notice
        var member = notice.penerima
        for (var i = 0; i < member.length; i++) {
            await Send.create({
                id_notice: id,
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