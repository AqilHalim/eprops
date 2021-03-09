const connection = require('../connection')
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
            message: 'success',
            status: true,
            total: families.length,
            data: families
        })
    } catch (err) {
        res.status(500).json({
            message: 'error' + err.message,
            status: false
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
        if (!family) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        res.status(200).json({
            message: 'success',
            status: true,
            data: family
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}