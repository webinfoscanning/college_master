const assetRoutes = require("express").Router();
const AssetController = require("../../controllers/asset/asset.controller");

const fileUploadController = require("../../controllers/fileupload/fileupload.controller");
const upload = require('../../service/upload');

const { verifyauth } = require('../../service/jwtauth.service');





// const {checkMasterDataAccess} = require("../../service/masteraccess.control");

/* asset data */
assetRoutes.get("/list", AssetController.AllAsset); //verifyauth
assetRoutes.post("/add", AssetController.CreateAsset);
assetRoutes.put("/update/:id", AssetController.UpdateAsset);
assetRoutes.delete("/delete/:id", AssetController.DeleteAsset);
assetRoutes.get("/getdata/:id", AssetController.getAssetById);


assetRoutes.post("/prodpurbill", upload.single("productPurchaseBill") , fileUploadController.fileUpload);
assetRoutes.post("/prodimage", upload.single("productImage") , fileUploadController.fileUpload);
assetRoutes.post("/proddoc", upload.single("productDoc") , fileUploadController.fileUpload);
assetRoutes.post("/docfile", upload.single("uploadDoc") , fileUploadController.fileUpload);
assetRoutes.post("/agreedocfile", upload.single("agreeUploadDoc") , fileUploadController.fileUpload);


module.exports = assetRoutes;
