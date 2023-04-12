require('dotenv').config()

const express = require("express")
const app= express();
const cors = require("cors")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const passport = require("passport")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
const userExpense = require("./routes/expense")
const userDues = require("./routes/dues")
app.use(cors())
app.use(express.json())
app.engine('html', require('ejs').renderFile);
app.set('view engine','html')
app.use(bodyParser.urlencoded({ extended: true }))
const path = require('path')

//routes
// app.use('/api/expense',)
app.use('/api/user',userRoutes)
app.use('/api/expense',userExpense)
app.use('/api/dues',userDues)
// app.use(express.static(path.join(__dirname,'/build')))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })