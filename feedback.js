const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const feedControl = require('./controller/feedControl')
router.get('/', feedControl.getAll)                                     //menampilkan semua data
router.get('/:id(\\d+)', feedControl.getOne)                            //menampilakn berdasarkan id
router.post('/', feedControl.postOne)                                   //menambahkan data
router.put('/:id(\\d+)/process', feedControl.putOneProcess)             //mengubah data
router.put('/:id(\\d+)/finish', feedControl.putOneFinish)               //mengubah data
router.put('/:id(\\d+)/read', feedControl.putOneRead)                   //mengubah data

module.exports = router
