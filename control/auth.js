var jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret", (err, result) => {
      if (err) {
        res.status(401).send({
          status: "false",
          message: "Session Expired!",
        });
      } else {
        next();
      }
    });
    // res.status(200).send({
    //   status: true,
    //   message: "OK!",
    // });
  } else {
    res.status(401).send({
      status: "false",
      message: "Not Authorized!",
    });
  }
};

module.exports = { auth };
