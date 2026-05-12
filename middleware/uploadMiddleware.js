const upload = require("../config/multer");

module.exports = (req, res, next) => {
  const singleUpload = upload.single("photo");

  singleUpload(req, res, function (error) {
    if (error) {
      if (error.code === "LIMIT_FILE_SIZE") {
        req.flash("error", "Max file size is 300KB");

        return res.redirect(req.get("Referer") || "/");
      }

      req.flash("error", error.message);

      return res.redirect(req.get("Referer") || "/");
    }

    next();
  });
};
