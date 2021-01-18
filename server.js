const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//parse aplication/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//panggil routes
const people = require('./people')              //people.js
app.use('/people', people)
const property = require('./properties')        //property.js
app.use('/properties', property)
const family = require('./families')            //family.js
app.use('/families', family)
const transaksi = require('./transaksi')        //transaksi.js
app.use('/transaksi', transaksi)
const noticeboard = require('./noticeboard')    //notice.js
app.use('/noticeboard', noticeboard)
const feedback = require('./feedback')          //feedback.js
app.use('/feedback', feedback)
const unit = require('./unit')                  //unit.js
app.use('/unit', unit)

app.listen(3000, () => {
    console.log('Server started on port 3000')
})