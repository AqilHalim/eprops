const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const famControl = require('./controller/famControl')
router.get('/', famControl.getAll)                                 //menampilkan semua data
router.get('/:id(\\d+)', famControl.getOne)                        //menampilakn berdasarkan id
router.post('/', famControl.postOne)                               //menambahkan data
router.put('/', famControl.putOne)                                 //mengubah data
router.delete('/:id(\\d+)', famControl.delOne)                     //menghapus data

module.exports = router
