var express = require("express");
const postController = require("../controllers/postController");
const sessionValidatorObj = require("../helpers/sessionValidator");


var router = express.Router();
router.post("/create",sessionValidatorObj.validateWebSession,postController.createUserPost);
router.post("/delete",sessionValidatorObj.validateWebSession,postController.deleteUserPost);

module.exports = router;
