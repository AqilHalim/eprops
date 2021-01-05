const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const peoControl = require('./controller/peoControl')
router.get('/', peoControl.getAll)                                     //menampilkan semua data
router.get('/:id(\\d+)', peoControl.getOne)                            //menampilakn berdasarkan id
router.post('/', peoControl.postOne)                                   //menambahkan data
router.post('/:id(\\d+)/families', peoControl.postFamily)
router.put('/:id(\\d+)', peoControl.putOne)                                     //mengubah data
router.delete('/:id(\\d+)', peoControl.delOne)                         //menghapus data

router.get('/families', peoControl.getAllFamilies)                     //menampilakan families dari semua id
router.get('/:id(\\d+)/families', peoControl.getOneFamily)             //menampilakan families berdasarkan id

router.get('/:id(\\d+)/properties/families', peoControl.getOneInfo)    //menampilakan info berdasarkan id

module.exports = router
