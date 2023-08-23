const { Router } = require('express');
const express = require('express');
const authenticate = require('../services/authenticate');
const validator = require('../utilities/validator').loginValidate;
const router = express.Router();

router.post("/login", validator(),  authenticate.authenticate)

module.exports = router