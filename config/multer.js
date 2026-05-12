const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExt = /jpg|jpeg/;

  const extname = allowedExt.test(
    path.extname(file.originalname).toLowerCase(),
  );

  const mimetype = allowedExt.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG/JPEG files are allowed"));
  }
};

module.exports = multer({
  storage,

  limits: {
    fileSize: 300 * 1024,
  },

  fileFilter,
});
