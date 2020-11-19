var express = require("express");
const friendController = require("../controllers/friendController");
const sessionValidatorObj = require("../helpers/sessionValidator");
var router = express.Router();

router.get("/get/all/users",sessionValidatorObj.validateWebSession,friendController.viewAllUsers);
router.post("/send/request",sessionValidatorObj.validateWebSession,friendController.sendFriendRequest);
router.post("/accept/reject/request",sessionValidatorObj.validateWebSession,friendController.AcceptAndRejectFriendRequest);
router.post("/remove",sessionValidatorObj.validateWebSession,friendController.removeFriend);
router.get("/get/my/friends",sessionValidatorObj.validateWebSession,friendController.viewMyFriends);
router.post("/get/mutual/friends",sessionValidatorObj.validateWebSession,friendController.viewMutualFriends);


module.exports = router;
