const mysql = require("mysql");
const { dbConnection } = require("../../cnfig/db-config");




const fileNameGeneratorProduct = (req, res, next) => {
    const findProductId = `SELECT COUNT(*) AS count FROM products WHERE productId = ?`;
    const productIdGen = (Math.random() * 100000000000000).toString().slice(0, 12)
      .toString()
      .slice(0, 10);
    dbConnection.query(findProductId, [productIdGen], (err, result, field) => {
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