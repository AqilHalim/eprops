const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const transControl = require('./controller/transControl')
router.get('/', transControl.getAll)                                     //menampilkan semua data
router.get('/:id(\\d+)', transControl.getOne)                            //menampilakn berdasarkan id
router.post('/', transControl.postOne)                                   //menambahkan data
module.exports = router
