const express = require("express");
const { validationResult } = require("express-validator");
const moment = require("moment");
const { dbConnection } = require("../cnfig/db-config");
const { errorResponse } = require("../utilities/errorResponse");

const getProduct = (req, res, next) => {
  if (validationResult(req)?.errors?.length > 0) {
    res.status(500).send(errorResponse(validationResult(req)?.errors?.[0]));
  } 
  else {
    const getParam = [
        req.body.productId
    ];

    const getProductQuery = `SELECT productName, productId, productPrice, productDescription, availableCount FROM products WHERE (productId = ?)`
    dbConnection.query(getProductQuery, getParam, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send({
            status: true,
            data: result,
            message: "",
          });
        }
      });
  }
};

const getAllProduct = (req, res, next) => {
    if (validationResult(req)?.errors?.length > 0) {
      res.status(500).send(errorResponse(validationResult(req)?.errors?.[0]));
    } 
    else {
      const getParam = [
          req.body.productId
      ];
  
      const getProductQuery = `SELECT productName, productId, productPrice, productDescription, availableCount FROM products`
      dbConnection.query(getProductQuery, getParam, (err, result) => {
          if (err) {
            throw err;
          } else {
            res.status(200).send({
              status: true,
              data: result,
              message: "",
            });
          }
        });
    }
  };

module.exports = { getProduct, getAllProduct };
 