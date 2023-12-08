const express = require("express");
const { validationResult } = require("express-validator");
const moment = require("moment");
const { dbConnection } = require("../cnfig/db-config");
const { errorResponse } = require("../utilities/errorResponse");

const addToCart = (req, res, next) => {
  if (validationResult(req)?.errors?.length > 0) {
    res.status(500).send(errorResponse(validationResult(req)?.errors?.[0]));
  } else {
    const searchQuery = `SELECT COUNT(*) AS count FROM usercart WHERE (userId = ? && productId = ?)`;
    searchParams = [req.body.userId, req.body.productId];
    dbConnection.query(searchQuery, searchParams, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result[0].count > 0) {
          const updateParams = [
            req.body.productCount,
            moment().format("DD/MM/YYYY"),
            req.body.userId,
            req.body.productId,
          ];

          const updateQuery = `UPDATE usercart SET productCount = productCount + ?, addDate = ? WHERE (userId = ? && productId = ?)`;
          dbConnection.query(updateQuery, updateParams, (err, result) => {
            if (err) {
              throw err;
            } else {
              res.status(200).send({
                status: true,
                message: "Cart updated successfully!",
              });
            }
          });
        } else {
          params = [
            req.body.userId,
            req.body.productId,
            req.body.productCount,
            moment().format("DD/MM/YYYY"),
          ];
          const insertQuery = `INSERT INTO userCart (userId, productId, productCount, addDate ) VALUES (?, ?, ?, ?)`;
          dbConnection.query(insertQuery, params, (err, result) => {
            if (err) {
              throw err;
            } else {
              res.status(200).send({
                status: true,
                message: "Added to cart successfully!",
              });
            }
          });
        }
      }
    });
  }
};

module.exports = { addToCart };
