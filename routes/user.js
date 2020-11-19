var express = require("express");
const multer  = require('multer');
const storage = multer.diskStorage({
  destination:function(req,file,cb){
   cb(null,'./uploads/');
  },
 filename:function(req,file,cb){
   cb(null,new Date().toISOString()+file.originalname);
 }
});
const upload = multer({storage:storage});
const sessionValidatorObj = require("../helpers/sessionValidator");
const authenticationController = require("../controllers/authenticationController");
var router = express.Router();

router.post("/register/user",authenticationController.registerUser);
router.post("/login",authenticationController.loginUser);
router.post("/forgot/password",authenticationController.forgotPassword);
router.post("/password/change",authenticationController.passwordChange);
router.post("/profile/update",sessionValidatorObj.validateWebSession,upload.single('profilePic'),authenticationController.profileUpdate);

// router.get("/", BookController.bookList);
// router.get("/:id", BookController.bookDetail);
// router.post("/", BookController.bookStore);
// router.put("/:id", BookController.bookUpdate);
// router.delete("/:id", BookController.bookDelete);
//
 module.exports = router;
