const UserRoutes = require("express").Router();
const authController = require("../../controllers/user/auth.controller");


const fileUploadController = require("../../controllers/fileupload/fileupload.controller");
const upload = require('../../service/upload');


UserRoutes.post('/login', (req, res) => {
    authController.login(req, res);
});

UserRoutes.post('/signup', (req, res) => {
    authController.create(req, res);
});

UserRoutes.get('/list', (req, res) => {
    authController.list(req, res);
});

UserRoutes.put('/update/:id', (req, res) => { // verifyauth -- middle wear
    authController.updateUser(req, res);
});

UserRoutes.delete('/delete/:id', (req, res) => { // verifyauth, 
    authController.deleteUser(req, res);
});


UserRoutes.post("/userphoto", upload.single("photo") , fileUploadController.fileUpload);

// UserRoutes.put('/update', verifyauth, (req, res) => {
//     authController.deleteUser(User, req, res);
// });

// UserRoutes.delete('/delete', verifyauth, (req, res) => {
//     authController.deleteUser(User, req, res);
// });


UserRoutes.post('/reset-password-email', (req, res) => {
    authController.sendEmailLink(req, res);
})
UserRoutes.post('/reset-password', (req, res) => {
    authController.changePassword(req, res);
});






module.exports = UserRoutes;
