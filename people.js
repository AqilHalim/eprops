const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const peoControl = require('./controller/peoControl')
router.get('/', peoControl.getAll)                                     //menampilkan semua data
router.get('/:id([0-9]+)', peoControl.getOne)                          //menampilakn berdasarkan id
router.post('/', peoControl.postOne)                                   //menambahkan data
router.post('/:id([0-9]+)/families', peoControl.postFamily)
router.put('/:id([0-9]+)', peoControl.putOne)                          //mengubah data
router.delete('/:id([0-9]+)', peoControl.delOne)                       //menghapus data

router.get('/properties', peoControl.getAllProperties)                 //menampilakan properties dari semua id
router.get('/:id([0-9]+)/properties', peoControl.getOneProperty)       //menampilakan properties berdasarkan id

router.get('/families', peoControl.getAllFamilies)                     //menampilakan families dari semua id
router.get('/:id([0-9]+)/families', peoControl.getOneFamily)           //menampilakan families berdasarkan id
router.put('/:id([0-9]+)/families', peoControl.putOneFamily)

router.get('/:id([0-9]+)/properties/families', peoControl.getOneInfo)  //menampilakan info berdasarkan id

router.get('/:id([0-9]+)/feedback', peoControl.getOneFeed)             //menampilakan feedback berdasarkan id

module.exports = router
