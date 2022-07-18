const filelocation = require("path");

exports.fileUpload = (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
    // let uploadPath = filelocation.join(process.cwd(), "", path);

    res.status(200).json({
      message: "Uploaded file details",
      status: true,
      statuscode: 200,
      data: {
        uploadPath: url + '/' + path
      },
    });
  } catch (e) {
    next(e);
  }
};


