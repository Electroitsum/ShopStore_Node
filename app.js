const express = require('express')
const app = express();
const registration = require('./routes/registration');
const login = require('./routes/login')
const bodyParser = require('body-parser')
const addProduct = require('./routes/addProductRoute');
const auth = require('./control/auth').auth
app.use(bodyParser.json())
app.use('/auth', auth)



app.use('/user', registration);
app.use('/', login)
app.use('/auth/newProduct', addProduct)


module.exports = app;