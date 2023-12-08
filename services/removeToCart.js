const express = require("express");
const { validationResult } = require("express-validator");
const moment = require("moment");
const { dbConnection } = require("../cnfig/db-config");
const { errorResponse } = require("../utilities/errorResponse");

const removeToCart = (req, res, next) => {
  if (validationResult(req)?.errors?.length > 0) {
    res.status(500).send(errorResponse(validationResult(req)?.errors?.[0]));
  } else {
    params = [req.body.userId, req.body.productId];
    const countQuery = `SELECT productCount FROM usercart WHERE (userId = ? && productId = ?)`;
    dbConnection.query(countQuery, params, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result[0].productCount == req.body.productCount || req.body.productCount == null || req.body.productCount == 0) {
          const deleteQuery = `DELETE FROM usercart WHERE userId = ? && productId = ?`;
          params = [req.body.userId, req.body.productId];
          dbConnection.query(deleteQuery, params, (err, result) => {
            if (err) {
              throw err;
            } else {
              res.status(200).send({
                status: true,
                message: "Removed from cart successfully!",
              });
            }
          });
        } else {
          const updateParams = [
            req.body.productCount,
            moment().format("DD/MM/YYYY"),
            req.body.userId,
            req.body.productId,
          ];

          const updateQuery = `UPDATE usercart SET productCount = productCount - ?, addDate = ? WHERE (userId = ? && productId = ?)`;
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
        }

        console.log(result[0].productCount);
      }
    });
  }
};

module.exports = { removeToCart };
