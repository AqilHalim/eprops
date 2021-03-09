const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const famControl = require('./controller/famControl')
router.get('/', famControl.getAll)                                 //menampilkan semua data
router.get('/:id([0-9]+)', famControl.getOne)                        //menampilakn berdasarkan id

module.exports = router
