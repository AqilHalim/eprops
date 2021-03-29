const { Op } = require("sequelize")
const connection = require('../connection')
const People = require('../models/people')(connection)
const Property = require('../models/property')(connection)
const Unit = require('../models/unit')(connection)
const P_Role = require('../models/people_role')(connection)
const Family = require('../models/family')(connection)
const F_Role = require('../models/family_role')(connection)
const Feed = require('../models/feedback')(connection)

People.hasMany(Unit, {
    foreignKey: 'id_people'
})
Unit.belongsTo(People, {
    foreignKey: 'id_people'
})
Property.hasOne(Unit, {
    foreignKey: 'id_property'
})
Unit.belongsTo(Property, {
    foreignKey: 'id_property'
})
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
F_Role.hasOne(Family, {
    foreignKey: 'role'
})
Family.belongsTo(F_Role, {
    foreignKey: 'role'
})
People.hasMany(Feed, {
    foreignKey: 'id_people'
})
Feed.belongsTo(People, {
    foreignKey: 'id_people'
})

//menampilkan semua data
exports.getAll = async function (req, res) {
    try {
        const people = await People.findAll({
            attributes: {
                exclude: 'updatedAt'
            }
        })
        res.status(200).json({
            message: 'success',
            status: true,
            total: people.length,
            data: people
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
        const people = await People.findOne({
            where: {
                id_people: req.params.id
            },
            attributes: {
                exclude: 'updatedAt'
            }
        })
        if (!people) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        res.status(200).json({
            message: 'success',
            status: true,
            data: people
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
                },
                attributes: {
                    exclude: 'updatedAt'
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

//mengubah data
exports.putOne = async function (req, res) {
    try {
        const people = await People.findOne({
            where: {
                id_people: req.params.id
            }
        })
        if (!people) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        const kk = await Family.findOne({
            where: {
                id_people: req.params.id
            }
        })
        const old_kk = kk.kk
        const old_role = kk.role
        await People.update(req.body, {
            where: {
                id_people: req.params.id
            }
        })
        if (old_role !== 1) {
            res.status(403).json({
                message: 'Tidak Bisa Melakukan Update KK Selain Kepala Keluarga',
                status: false
            })
            return
        }
        await Family.update(req.body, {
            where: {
                kk: old_kk
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
    try {
        const kepala = await Family.findOne({
            where: {
                id_people: req.params.id
            }
        })
        if (!kepala) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        const kk = kepala.kk
        const kpl = kepala.role
        await People.destroy({
            include: Family,
            where: {
                id_people: req.params.id
            }
        })
        if (kpl == 1) {
            await Family.destroy({
                where: {
                    kk: kk
                }
            })
        }
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

//menampilakan properties dari semua id people
exports.getAllProperties = async function (req, res) {
    try {
        const unit = await Unit.findAll({
            include: [
                {
                    model: People,
                    attributes: {
                        exclude: 'updatedAt'
                    }
                },
                {
                    model: Property,
                    attributes: {
                        exclude: 'updatedAt'
                    }
                }
            ],
            attributes: {
                exclude: 'updatedAt'
            }
        })
        res.status(200).json({
            message: 'success',
            status: true,
            data: unit
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}

//menampilakan properties berdasarkan id people
exports.getOneProperty = async function (req, res) {
    try {
        const people = await Unit.findOne({
            include: [
                {
                    model: People,
                    attributes: {
                        exclude: 'updatedAt'
                    }
                },
                {
                    model: Property,
                    attributes: {
                        exclude: 'updatedAt'
                    }
                }
            ],
            attributes: {
                exclude: 'updatedAt'
            },
            where: {
                id_people: req.params.id
            }
        })
        if (!people) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        res.status(200).json({
            message: 'success',
            status: true,
            data: people
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}

//menampilakan families dari semua id people
exports.getAllFamilies = async function (req, res) {
    try {
        const people = await People.findAll({
            include: {
                model: Family,
                attributes: {
                    exclude: 'updatedAt',
                }
            },
            attributes: {
                exclude: 'updatedAt'
            }
        })
        res.status(200).json({
            message: 'success',
            status: true,
            data: people
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
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
            },
            attributes: {
                exclude: 'updatedAt'
            }
        })
        if (!people) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        const fam = people.family_model.kk
        const family = await Family.findAll({
            include: [{
                model: People,
                attributes: {
                    exclude: 'updatedAt'
                }
            },
            {
                model: F_Role,
            }],
            where: {
                kk: fam,
                id_people: {
                    [Op.ne]: req.params.id
                },
            },
            attributes: {
                exclude: 'updatedAt, createdAt'
            }
        })
        var cust = people.toJSON()
        cust.family_model = family
        res.status(200).json({
            message: 'success',
            status: true,
            data: cust
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}

exports.putOneFamily = async function (req, res) {
    try {
        // const people = await People.findOne({
        //     include: Family,
        //     where: {
        //         id_people: req.params.id
        //     }
        // })
        // if (!people) {
        //     res.status(200).json({
        //         message: 'no record',
        //         status: false,
        //     })
        //     return
        // }
        res.status(200).json({
            message: 'success',
            status: true,
            data: cust
        })
    } catch (error) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}

//menampilakan info berdasarkan id people
exports.getOneInfo = async function (req, res) {
    try {
        const people = await People.findOne({
            include: [
                {
                    model: Unit,
                    include: [Property]
                },
                {
                    model: Family
                }
            ],
            where: {
                id_people: req.params.id
            },
            attributes: {
                exclude: 'updatedAt'
            }
        })
        if (!people) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
        const fam = people.family_model.kk
        const family = await Family.findAll({
            include: [{
                model: People,
                attributes: {
                    exclude: 'updatedAt'
                }
            },
            {
                model: F_Role,
            }],
            where: {
                kk: fam,
                id_people: {
                    [Op.ne]: req.params.id
                },
            },
            attributes: {
                exclude: 'updatedAt, createdAt'
            }
        })
        var cust = people.toJSON()
        cust.family_model = family
        res.status(200).json({
            message: 'success',
            status: true,
            data: cust
        })
    } catch (err) {
        res.status(500).json({
            message: 'error: ' + err.message,
            status: false
        })
    }
}

//menampilakan feedback berdasarkan id
exports.getOneFeed = async function (req, res) {
    try {
        const people = await People.findOne({
            include: Feed,
            where: {
                id_people: req.params.id
            }
        })
        if (!people) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return
        }
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
    } R
}

exports.postFamily = async function (req, res) {
    try {
        const head = await People.findByPk(req.params.id)
        if (head === null) {
            res.status(404)
            return
        }
        if (!head) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
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