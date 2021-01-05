const { Op } = require("sequelize")
const connection = require('../koneksi')
const Property = require('../models/property')(connection)
const People = require('../models/people')(connection)
const P_Role = require('../models/people_role')(connection)
const Family = require('../models/family')(connection)
const F_Role = require('../models/family_role')(connection)
const Transaksi = require('../models/transaksi')(connection)

People.hasOne(Family, {
    foreignKey: 'id_people'
})
Family.belongsTo(People, {
    foreignKey: 'id_people'
})
People.hasOne(P_Role, {
    foreignKey: 'id_people'
})
P_Role.belongsTo(People, {
    foreignKey: 'id_people'
})
People.hasMany(Property, {
    foreignKey: 'id_people'
})
Property.belongsTo(People, {
    foreignKey: 'id_people'
})
F_Role.hasOne(Family, {
    foreignKey: 'role'
})
Family.belongsTo(F_Role, {
    foreignKey: 'role'
})
People.hasMany(Transaksi, {
    foreignKey: 'id_people'
})
Transaksi.belongsTo(People, {
    foreignKey: 'id_people'
})

//menampilkan semua data
exports.getAll = async function (req, res) {
    try {
        const people = await People.findAll({
            include: [Property, P_Role]
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: people
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
        const people = await People.findOne({
            include: Property,
            where: {
                id_people: req.params.id
            }
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: people
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
        const people = await People.create(req.body)
        const id = people.id_people
        await Family.create({
            id_people: id,
            kk: req.body.kk
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
        const kk1 = await Family.findOne({
            where: {
                id_people: req.params.id
            }
        })
        const old_kk = kk1.kk
        const old_role = kk1.role
        if (old_role == 1) {
            await Family.update(req.body, {
                where: {
                    kk: old_kk
                }
            })
            await People.update(req.body, {
                where: {
                    id_people: req.params.id
                }
            })
        } else if (Family.kk == req.body.kk) {
            await People.update(req.body, {
                where: {
                    id_people: req.params.id
                }
            })
        } else {
            await People.update(req.body, {
                where: {
                    id_people: req.params.id
                }
            })
            res.status(403).json({
                message: 'Tidak Bisa Melakukan Update KK Selain Kepala Keluarga',
                status: 'failed'
            })
        }
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
        await People.destroy({
            include: Family,
            where: {
                id_people: req.params.id
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

//menampilakan properties dari semua id
exports.getAllProperties = async function (req, res) {
    // try {
    //     const people = await People.findAll({
    //         include: Property
    //     })
    //     res.status(200).json({
    //         message: 'Anda Berhasil',
    //         status: 'success',
    //         data: people
    //     })
    // } catch (err) {
    //     res.status(500).json({
    //         message: 'Terdapat Error: ' + err.message,
    //         status: 'failed'
    //     })
    // }
}

//menampilakan properties berdasarkan id
exports.getOneProperty = async function (req, res) {
    // try {
    //     const people = await People.findOne({
    //         include: Property,
    //         where: {
    //             id_people: req.params.id
    //         }
    //     })
    //     res.status(200).json({
    //         message: 'Anda Berhasil',
    //         status: 'success',
    //         data: people
    //     })
    // } catch (err) {
    //     res.status(500).json({
    //         message: 'Terdapat Error: ' + err.message,
    //         status: 'failed'
    //     })
    // }
}

//menampilakan families dari semua id
exports.getAllFamilies = async function (req, res) {
    try {
        const people = await People.findAll({
            include: Family
        })
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: people
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    }
}

//menampilakan families berdasarkan id
exports.getOneFamily = async function (req, res) {
    try {
        const people = await People.findOne({
            include: Family,
            where: {
                id_people: req.params.id
            }
        })
        const fam = people.family_model.kk
        const family = await Family.findAll({
            include: ([People, F_Role]),
            where: {
                kk: fam,
                id_people: {
                    [Op.ne]: req.params.id
                }
            }
        })
        var cust = people.toJSON()
        cust.family_model = family
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: cust
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    } R
}

//menampilakan info dari semua id
exports.getAllInfo = async function (req, res) {
    // try {
    //     const people = await People.findAll({
    //         // include: Family,
    //         include: {
    //             model: Property,
    //             include: Family
    //         }
    //     })
    //     res.status(200).json({
    //         message: 'Anda Berhasil',
    //         status: 'success',
    //         data: people
    //     })
    // } catch (err) {
    //     res.status(500).json({
    //         message: 'Terdapat Error: ' + err.message,
    //         status: 'failed'
    //     })
    // }
}

//menampilakan info berdasarkan id
exports.getOneInfo = async function (req, res) {
    try {
        const people = await People.findOne({
            where: {
                id_people: req.params.id
            }
        })
        const fam = people.family_model.kk
        const family = await Family.findAll({
            include: ([People, F_Role]),
            where: {
                kk: fam,
                id_people: {
                    [Op.ne]: req.params.id
                }
            }
        })
        var cust = people.toJSON()
        cust.family_model = family
        res.status(200).json({
            message: 'Anda Berhasil',
            status: 'success',
            data: cust
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: 'failed'
        })
    }
}

exports.postFamily = async function (req, res) {
    try {
        const head = await People.findByPk(req.params.id)
        if (head === null) {
            res.status(404)
            return
        }
        const families = req.body.data

        families.forEach(family => {
            if (head.kk != family.kk) {
                res.status(400).json({ message: "KK tidak sama dengan kepala keluarga" })
                return
            }
        })

        var data_disave
        families.forEach(family => {
            data_disave = {
                nama: family.nama,
                nik: family.nik,
                kk: family.kk,
                alamat: family.alamat,
                kecamatan: family.kecamatan,
                kabupaten: family.kabupaten,
                kodepos: family.kodepos,
                tempatlahir: family.tempatlahir,
                tanggallahir: family.tanggallahir,
                jeniskelamin: family.jeniskelamin,
                agama: family.agama,
                status: family.status,
                pekerjaan: family.pekerjaan,
                warganegara: family.warganegara,
                hp: family.hp,
                email: family.email
            }
        })

        await People.create(data_disave)
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