const express = require("express");
const router = express.Router();
const multer = require("multer");
const validator = require('../utilities/validator').addProductValidate;
const cartValidator = require('../utilities/validator').cartValidator;
const fileNameGeneratorProduct = require('../utilities/middleware/fileNameGenerator').fileNameGeneratorProduct;
const addProduct = require("../services/addProduct");
const  addToCart  = require("../services/addToCart");
const { upload } = require("../utilities/middleware/uploadFileMiddleware");



router.post("/addproduct", fileNameGeneratorProduct, upload.single('name'), validator(), addProduct.addProduct);
router.post("/addToCart", cartValidator(), addToCart.addToCart)
 
module.exports = router;
