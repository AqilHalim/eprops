const connection = require('../connection')
const People = require('../models/people')(connection)
const Property = require('../models/property')(connection)
const Transaksi = require('../models/transaksi')(connection)
const Unit = require('../models/unit.js')(connection)

People.hasMany(Unit, {
    foreignKey: 'id_people'
})
Unit.belongsTo(People, {
    foreignKey: 'id_people'
})
Property.hasOne(Unit, {
    foreignKey: 'id_people'
})
Unit.belongsTo(Property, {
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
            message: 'success',
            status: true,
            total: properties.length,
            data: properties
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
        const property = await Property.findOne({
            where: {
                id_property: req.params.id
            }
        })
        if (!property) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        res.status(200).json({
            message: 'success',
            status: true,
            data: property
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}

//menambahkan data
exports.postOne = async function (req, res) {
    try {
        await Property.create(req.body)
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

//mengubah data
exports.putOne = async function (req, res) {
    try {
        const property = await Property.findOne({
            where: {
                id_property: req.params.id
            }
        })
        if (!property) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        await Property.update(req.body, {
            where: {
                id_property: req.params.id
            }
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

//menghapus data
exports.delOne = async function (req, res) {
    // try {
    //     await Property.destroy({
    //         where: {
    //             id_property: req.params.id
    //         }
    //     })
    //     res.status(200).json({
    //         message: 'success',
    //         status: true
    //     })
    // } catch (err) {
    //     res.status(500).json({
    //         message: 'error: ' + err.message,
    //         status: false
    //     })
    // }
}