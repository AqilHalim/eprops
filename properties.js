const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const propControl = require('./controller/propControl')
router.get('/', propControl.getAll)                                 //menampilkan semua data
router.get('/:id([0-9]+)', propControl.getOne)                        //menampilakn berdasarkan id
router.post('/', propControl.postOne)                               //menambahkan data
router.put('/:id([0-9]+)', propControl.putOne)                        //mengubah data
// router.delete('/:id(\\d+)', propControl.delOne)                     //menghapus data

module.exports = router
