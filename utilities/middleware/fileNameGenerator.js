const mysql = require("mysql");


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

const fileNameGeneratorProduct = (req, res, next) => {
    const findProductId = `SELECT COUNT(*) AS count FROM products WHERE productId = ?`;
    const productIdGen = (Math.random() * 100000000000000).toString().slice(0, 12)
      .toString()
      .slice(0, 10);
    connection.query(findProductId, [productIdGen], (err, result, field) => {
      if (err) {
        console.log(err);
      } else if (result[0].count > 0) {
        insertProduct();
      } else {
        const fileName = `${productIdGen}`
        req.generatedName = fileName;
      }
    });
    next();
}

module.exports= {fileNameGeneratorProduct}