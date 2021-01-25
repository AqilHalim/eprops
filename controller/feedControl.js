const connection = require('../koneksi')
const People = require('../models/people')(connection)
const Msg = require('../models/message')(connection)
const Feed = require('../models/feedback')(connection)
const Status = require('../models/status_feedback')(connection)

Msg.hasOne(Feed, {
    foreignKey: 'id_message'
})
Feed.belongsTo(Msg, {
    foreignKey: 'id_message'
})
People.hasMany(Feed, {
    foreignKey: 'id_people'
})
Feed.belongsTo(People, {
    foreignKey: 'id_people'
})
Status.hasOne(Feed, {
    foreignKey: 'id_feedback'
})

//menampilkan semua data
exports.getAll = async function (req, res) {
    try {
        const feed = await Feed.findAll({
            include: Msg
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            total: feed.length,
            data: feed
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
        const msg = await Msg.findOne({
            where: {
                id_message: req.params.id
            }
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: msg
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
        const msg = await Msg.create(req.body)
        const id = msg.id_message
        var member = msg.penerima
        for (var i = 0; i < member.length; i++) {
            await Feed.create({
                id_message: id,
                id_people: member[i],
                id_kategori: req.body.id_kategori,
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
        await Feed.update({ tanggalproses: new Date() }, {
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
        await Feed.update({ tanggalselesai: new Date() }, {
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
        await Feed.update({ tanggalbaca: new Date() }, {
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