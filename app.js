const express = require('express')
const app = express();
const registration = require('./routes/registration');
const login = require('./routes/login')
const bodyParser = require('body-parser')
const addProduct = require('./routes/addProductRoute');
const { dbConnection } = require('./cnfig/db-config');
const auth = require('./control/auth').auth

// dbConnection();
const qu = dbConnection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
app.use(bodyParser.json())
app.use('/auth', auth)



app.use('/user', registration);
app.use('/', login)
app.use('/auth/Products', addProduct)
// app.use('/auth/Product', addProduct)


module.exports = app;