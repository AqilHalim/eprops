const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const unitControl = require('./controller/unitControl')
router.get('/', unitControl.getAll)                             //menampilkan semua data
router.get('/:id([0-9]+)', unitControl.getOne)                    //menampilakn berdasarkan id
router.put('/:id([0-9]+)', unitControl.putOne)             //mengubah data

module.exports = router
