const express = require("express");
const { check, validationResult } = require("express-validator");
const { errorResponse } = require("../utilities/errorResponse");
var jwt = require("jsonwebtoken");
const { dbConnection } = require("../cnfig/db-config");



const authenticate = (req, res, next) => {
  if (validationResult(req)?.errors?.length > 0) {
    res.status(500).send(errorResponse(validationResult(req)?.errors?.[0]));
  } else {
    const userMatch = `SELECT COUNT(*) AS count FROM user WHERE (email = ? && password = ?)`;
    const userData = `SELECT id, name, email, userId FROM user WHERE (email = ? && password = ?)`;
    // console.log(req.body);
    dbConnection.query(
      userMatch,
      [req.body.email, req.body.password],
      (err, result, fields) => {
        if (err) {
          throw err;
        } else {
          if (result[0].count > 0) {
            dbConnection.query(
              userData,
              [req.body.email, req.body.password],
              (err, result, fields) => {
                if (err) {
                  throw err;
                } else {
                  const token = jwt.sign(
                    {
                      data: result,
                    },
                    "secret",
                    { expiresIn: "1h" }
                  );
                  res.status(200).send({
                    status: true,
                    message: "Login Successful!",
                    userData: result?.[0],
                    token: token,
                  });
                }
              }
            );
          } else {
            res.status(200).send({
              status: false,
              message: "Invalid User!",
            });
          }
        }
      }
    );
  }
};

module.exports = { authenticate };
