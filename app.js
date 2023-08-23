const express = require('express')
const app = express();
const registration = require('./routes/registration');
const login = require('./routes/login')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/user', registration);
app.use('/', login)


module.exports = app;