const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,  "./assets/images/");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    const validExts = [".png", ".jpg", ".jpeg", ".pdf"];
    
    if(!validExts.includes(path.extname(file.originalname))){
        return callback(new Error("Only .pdf, .png, .jpg, and .jpeg format alloewd."))
    }
    const fileSize = paresInt(req.headers["content-length"]);
    if(fileSize > 1048576){
        return callback(new Error("File size is big"));
    }

    callback(null, true);
}

// let upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     fileSize: 1048576
// });

let upload = multer({
    storage: storage
});

// module.exports = upload.single("productImage");

module.exports = upload;