const express = require("express");
const router = express.Router();
const multer = require("multer");
const validator = require('../utilities/validator').addProductValidate;
const cartValidator = require('../utilities/validator').cartValidator;
const fileNameGeneratorProduct = require('../utilities/middleware/fileNameGenerator').fileNameGeneratorProduct;
const addProduct = require("../services/addProduct");
const  addToCart  = require("../services/addToCart");
const  getProduct  = require("../services/getProduct");
const removeToCart = require("../services/removeToCart");
const { upload } = require("../utilities/middleware/uploadFileMiddleware");
const { getProductValidator } = require("../utilities/validator");



router.post("/addproduct", fileNameGeneratorProduct, upload.single('name'), validator(), addProduct.addProduct);
router.post("/addToCart", cartValidator(), addToCart.addToCart)
router.post("/removeToCart", cartValidator(), removeToCart.removeToCart)
router.get("/getSingleProduct", getProductValidator(), getProduct.getProduct)
router.get("/getAllProduct", getProduct.getAllProduct)
router.get("/DeleteProduct", getProductValidator(), addProduct.deleteProduct)
 
module.exports = router;
