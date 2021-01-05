const connection = require('../koneksi')
const People = require('../models/people')(connection)
const Property = require('../models/property')(connection)
const Transaksi = require('../models/transaksi')(connection)

People.hasMany(Property, {
    foreignKey: 'id_people'
})
Property.belongsTo(People, {
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
        const properties = await Property.findAll()
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: properties
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
        const property = await Property.findOne({
            where: {
                id_property: req.params.id
            }
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: property
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
        const property = await Property.create(req.body)
        const id_cust = property.id_people
        const id_prop = property.id_property
        const hrg = property.harga
        await Transaksi.create({
            id_people: id_cust,
            id_property: id_prop,
            jmlpembayaran: hrg
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

//mengubah data
exports.putOne = async function (req, res) {
    try {
        await Property.update(req.body, {
            where: {
                id_property: req.body.id_property
            }
        }).then(() => {
            Transaksi.findOrCreate({ jmlpembayaran: Property.harga }, {
                where: {
                    id_property: req.body.id_property,
                }
            })
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

//menghapus data
exports.delOne = async function (req, res) {
    try {
        await Property.destroy({
            where: {
                id_property: req.params.id
            }
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