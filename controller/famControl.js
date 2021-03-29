const connection = require('../connection')
const People = require('../models/people')(connection)
const Family = require('../models/family')(connection)
const peoControl = require('../controller/peoControl')

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

exports.postOne = async function (req, res) {
    if (!req.body.nik) {
        res.status(200).json({
            message: 'missing nik',
            status: false
        });
        return
    }
    try {
        const peopleExist = await People.findOne({
            where: {
                nik: req.body.nik
            }
        })
        if (peopleExist) {
            res.status(200).json({
                message: 'duplicate nik',
                status: false
            })
            return
        }
        const famExist = await People.findAll({
            include: {
                model: Family,
                where: {
                    kk: req.body.kk
                }
            }
        })
        const people = await People.create(req.body)
        const id = people.id_people //mengambil id_people dari record people dan memasukkannya dalam variable
        var role = 3
        if (req.body.status === 'Menikah') {
            role = req.body.role
        }
        await P_Role.create({
            id_people: id,
            jenisrole: req.body.jenisrole
        })
        if (req.body.kk) {
            await Family.create({
                id_people: id,
                kk: req.body.kk,
                role: role
            })
        }
        res.status(200).json({
            message: 'success',
            status: true,
            data: people,
            families: famExist
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}