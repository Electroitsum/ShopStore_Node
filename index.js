const express = require('express');
// const app = express();
const port = 3002;
// const router = express.Router();
const mysql = require('mysql');
const app = require('./app')

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'dbsample',
//   port: 3306,
//   multipleStatements: true
// });

// const qu = connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");  
// });

// app.get('/Dashboard', (req, res) => {
//   // res.send(200,`Server is online!`);
//   connection.query("SELECT * FROM testtable", function (err, result, fields) {
//     if (err) throw err;
//     res.send(200,result);
//   });
// });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});