const multer = require('multer');
const whitelist =[
  'image/png'
]


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        req.tipp = "tipp";
      const raw = file.mimetype.split("/");
      const ext = raw[raw.length - 1];
      cb(null, "uploadedFile");
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      req.fileTypeError = "Invalid File Type!"
      return cb(null, true, req.fileTypeError)
    }

    cb(null, true)
  }


 const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = {upload}



