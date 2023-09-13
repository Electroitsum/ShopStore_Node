const express = require("express");
const mysql = require("mysql");
const { check, validationResult } = require("express-validator");
const { errorResponse } = require("../utilities/errorResponse");
var jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file);
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const raw = file.mimetype.split("/");
    const ext = raw[raw.length - 1];
    cb(null, "addProduct" + Date.now() + "." + ext);
  },
});
const upload = multer({ storage: storage });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "shopStore",
  port: 3306,
  multipleStatements: true,
});
const qu = connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const addProduct = (req, res, next) => {
  var ext;
  const raw = req.file.mimetype.split("/");
  ext = raw[raw.length - 1];
  if (validationResult(req)?.errors?.length > 0) {
    res.status(500).send(errorResponse(validationResult(req)?.errors?.[0]));
    const fileName = "addProduct" + "." + ext;
    fs.unlink(`F:/back/tester/uploads/addProduct.png`, (err) => {
      console.log(err);
    });
  } else {
    const insertProduct = () => {
      const findProductId = `SELECT COUNT(*) AS count FROM products WHERE productId = ?`;
      const productIdGen = (Math.random() * 100000000000000)
        .toString()
        .slice(0, 12)
        .toString()
        .slice(0, 10);
      connection.query(findProductId, [productIdGen], (err, result, field) => {
        if (err) {
          console.log(err);
        } else if (result[0].count > 0) {
          insertProduct();
        } else {
          const insertQuery = `INSERT INTO products (productName, productId,isActive,productPrice, productDescription,availabelCount) VALUES ('${
            req.body.productName
          }', ${productIdGen},${1},${req.body.productPrice},'${
            req.body.productDescription
          }',${req.body.availabelCount})`;
          connection.query(insertQuery, (err, result, fields) => {
            if (err) {
              throw err;
            } else {
              fs.rename(
                `F:/back/tester/uploads/uploadedFile`,
                `F:/back/tester/uploads/${productIdGen}.${ext}`,
                (err) => {
                  console.log(err);
                }
              );
              res.status(200).send({
                status: true,
                message: "Form submitted successfully!",
              });
            }
          });
        }
      });
    };
    insertProduct();
  }
};

module.exports = { addProduct };