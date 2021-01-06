const connection = require('../koneksi')
const People = require('../models/people')(connection)
const Notice = require('../models/notice')(connection)
const Send = require('../models/send_notice')(connection)

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
                id_people: member[i]
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