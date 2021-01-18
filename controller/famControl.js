const connection = require('../koneksi')
const custModel = require('../models/people')
const famModel = require('../models/family')

const People = custModel(connection)
const Family = famModel(connection)

Family.belongsTo(People, {
    foreignKey: "id_people"
})

//menampilkan semua data
exports.getAll = async function (req, res) {
    try {
        const families = await Family.findAll()
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            total: families.length,
            data: families
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error',
            status: 'failed'
        });
    }
}

//menampilkan berdasarkan id
exports.getOne = async function (req, res) {
    try {
        const family = await Family.findOne({
            where: {
                id_family: req.params.id
            }
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: family
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error',
            status: 'failed'
        })
    }
}