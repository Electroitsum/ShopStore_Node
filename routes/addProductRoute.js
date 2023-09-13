const express = require("express");
const router = express.Router();
const multer = require("multer");
const validator = require('../utilities/validator').addProductValidate;
const fileNameGeneratorProduct = require('../utilities/middleware/fileNameGenerator').fileNameGeneratorProduct;
const addProduct = require("../services/addProduct");
const { upload } = require("../utilities/middleware/uploadFileMiddleware");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // console.log(file);
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const raw = file.mimetype.split("/");
//     const ext = raw[raw.length - 1];
//     cb(null, req.generatedName + "." + ext);
//   },
// });


// const upload = multer({storage: storage});
// // const text = multer()



router.post("/addproduct", fileNameGeneratorProduct, upload.single('name'), validator(), addProduct.addProduct);
 
module.exports = router;
