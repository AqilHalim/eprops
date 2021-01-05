const connection = require('../koneksi')
const People = require('../models/people')(connection)
const Property = require('../models/property')(connection)
const Transaksi = require('../models/transaksi')(connection)

People.hasMany(Transaksi, {
    foreignKey: 'id_people'
})
Transaksi.belongsTo(People, {
    foreignKey: 'id_people'
})
Property.hasMany(Transaksi, {
    foreignKey: 'id_property'
})
Transaksi.belongsTo(Property, {
    foreignKey: 'id_people'
})

//menampilkan semua data
exports.getAll = async function (req, res) {
    try {
        const transaksi = await Transaksi.findAll()
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: transaksi
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
        const transaksi = await Transaksi.findOne({
            where: {
                id_people: req.params.id
            }
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: transaksi
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
        await Transaksi.create(req.body)
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

//mengubah data
exports.putOne = async function (req, res) {
    try {
        await Transaksi.update(req.body, {
            where: {
                id_people: req.body.id_people,
                id_property: req.body.id_people
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

// //menghapus data
exports.delOne = async function (req, res) {
    // try {
    //     await Transaksi.destroy({
    //         where: {
    //             id_people: req.params.id
    //         }
    //     })
    //     res.status(200).json({
    //         message: 'Anda Berhasil',
    //         status: 'success'
    //     })
    // } catch (err) {
    //     res.status(500).json({
    //         message: 'Terdapat Error: ' + err.message,
    //         status: 'failed'
    //     })
    // }
}