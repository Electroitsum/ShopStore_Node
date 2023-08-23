const express = require('express')
const router = express.Router();
const validator = require('../utilities/validator').registerValidate;

const register = require('../services/register')

router.post('/register', validator(), register.register)



module.exports = router