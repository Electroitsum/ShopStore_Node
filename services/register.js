const express = require("express");
const mysql = require("mysql");
const { check, validationResult } = require("express-validator");
const { errorResponse } = require("../utilities/errorResponse");
var jwt = require("jsonwebtoken");
const moment = require("moment");
const util = require('util');
const { dbConnection } = require("../cnfig/db-config");



const register = (req, res, next) => {
  if (validationResult(req)?.errors?.length > 0) {
    res.status(500).send(errorResponse(validationResult(req)?.errors?.[0]));
  } else {
    const query2 = `SELECT COUNT(*) as count FROM user WHERE email = ?`;
    const findId = `SELECT COUNT(*) AS count FROM user WHERE userId = ?`;

    const test = () => {
      const userId = (Math.random() * 1000000000000).toString().slice(0, 10);
      dbConnection.query(findId, [userId], (err, result, field) => {
        if (err) {
          throw err;
        } else {
          if (result[0].count > 0) {
            test();
          } else {
            const query = `INSERT INTO user (name, email, password, userId, registerDate) VALUES ("${req.body.name}", "${req.body.email}", "${req.body.password}", "${userId}", "${moment().format("DD/MM/YYYY")}")`;
            dbConnection.query(
              query2,
              [req.body.email],
              function (err, result, fields) {
                if (err) {
                  throw err;
                } else {
                  if (result[0].count > 0) {
                    res.status(200).send({
                      status: true,
                      message: "User already exist!",
                      file: __dirname
                    });
                  } else {
                    dbConnection.query(query, function (err, result, fields) {
                      if (err) {
                        throw err;
                      } else {
                        res.status(200).send({
                          status: true,
                          message: "User successfully created!",
                        });
                      }
                    });
                  }
                }
              }
            );
          }
        }
      });
    };
    test();
  }
};

module.exports = { register };
