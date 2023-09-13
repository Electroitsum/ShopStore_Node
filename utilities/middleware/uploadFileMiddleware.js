const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        console.log("klsdf", req.locals)
        req.tipp = "tipp";
      const raw = file.mimetype.split("/");
      const ext = raw[raw.length - 1];
      cb(null, "uploadedFile");
    },
  });
 const upload = multer({storage: storage});

module.exports = {upload}



