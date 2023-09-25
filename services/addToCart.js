const express = require("express");
const { validationResult } = require("express-validator");
const moment = require("moment");
const { dbConnection } = require("../cnfig/db-config");
const { errorResponse } = require("../utilities/errorResponse");

const addToCart = (req, res, next) => {
  if (validationResult(req)?.errors?.length > 0) {
    res.status(500).send(errorResponse(validationResult(req)?.errors?.[0]));
  } else {
    const insertQuery = `INSERT INTO userCart (userId, productId, addDate) VALUES (${req.body.userId}, ${req.body.productId}, ${moment().format("DD/MM/YYYY")})`;
    dbConnection.query(insertQuery, (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        dbConnection.query(insertQuery, (err, result) => {
          if (err) {
            throw err;
          } else {
            res.status(200).send({
              status: true,
              message: "Form submitted successfully!",
            });
          }
        });
      }
    });
  }
};

module.exports = { addToCart };
