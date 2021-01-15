const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const notControl = require('./controller/notControl')
router.get('/', notControl.getAll)                          //menampilkan semua data
router.get('/:id(\\d+)', notControl.getOne)                 //menampilakn berdasarkan id
router.post('/', notControl.postOne)                        //menambahkan data
router.put('/', notControl.putOne)                          //mengubah data

module.exports = router
