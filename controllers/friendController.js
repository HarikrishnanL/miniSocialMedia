const utilsObj = require("../helpers/utility");
const apiResponse = require("../helpers/apiResponse");
const friendBAObj = require("../layers/businessLayer/friendBA");
const constantMessage = require("../helpers/constants");

/*
friend controller module involves:
1.Send a friend request
2.Accept & Reject friend request
3.Remove Friend
4.View My Friends
5.View Friends of Friends
6.View Mutual Friends
 */

class FriendController{

    async viewAllUsers(req,res){
        try{
            let viewAllUserRecords = await friendBAObj.viewAllUsersBA(req.userId);
            if(viewAllUserRecords){
                apiResponse.successResponseWithData(res,'SUCCESS',viewAllUserRecords);
            }else{
                apiResponse.notFoundResponse(res,constantMessage.constants.user.USER_NOT_FOUND);
            }
        }catch (e) {
            console.log("viewFriends error ===>",e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    };

    async sendFriendRequest(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateField(body.friendUserId)){
                let sendFriendRequestResponse = await friendBAObj.sendFriendRequestBA(req.userId,body.friendUserId);
                if(sendFriendRequestResponse[0].message === constantMessage.constants.friend.SEND_FRIEND_REQUEST_SUCCESS){
                    apiResponse.successResponse(res,constantMessage.constants.friend.SEND_FRIEND_REQUEST_SUCCESS);
                }else if(sendFriendRequestResponse[0].message === constantMessage.constants.friend.SEND_FRIEND_REQUEST_ALREADY_SENT){
                    apiResponse.ErrorResponse(res,constantMessage.constants.friend.SEND_FRIEND_REQUEST_ALREADY_SENT);
                }else{
                    apiResponse.ErrorResponse(res,constantMessage.constants.friend.SEND_FRIEND_REQUEST_NOT_SUCCESS);
                }
            }else{
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());
            }

        }catch (e) {
            console.log('friendRequest ====>',e);
        }
    };

    async AcceptAndRejectFriendRequest(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateRequestFlag(body.requestFlag) && utilsObj.validateField(body.friendUserId)){
                if(body.requestFlag === 'ACCEPT'){
                    let acceptFriendRequestResponse = await friendBAObj.acceptFriendBA(req.userId,body.friendUserId);

                    if(acceptFriendRequestResponse[0].message === constantMessage.constants.friend.FRIEND_REQUEST_ACCEPTED){
                        apiResponse.successResponse(res,constantMessage.constants.friend.FRIEND_REQUEST_ACCEPTED);
                    }
                    else if(acceptFriendRequestResponse[0].message === constantMessage.constants.friend.FRIEND_REQUEST_NOT_FOUND){
                        apiResponse.ErrorResponse(res,constantMessage.constants.friend.FRIEND_REQUEST_NOT_FOUND);
                    }
                    else{
                        apiResponse.ErrorResponse(res,constantMessage.constants.friend.FRIEND_REQUEST_NOT_ACCEPTED);
                    }
                }else{
                    let rejectFriendRequestResponse = await friendBAObj.rejectFriendBA(req.userId,body.friendUserId);

                    if(rejectFriendRequestResponse[0].message === constantMessage.constants.friend.FRIEND_REQUEST_REJECTED){
                        apiResponse.successResponse(res,constantMessage.constants.friend.FRIEND_REQUEST_REJECTED);
                    }
                    else if(rejectFriendRequestResponse[0].message === constantMessage.constants.friend.FRIEND_REQUEST_NOT_FOUND){
                        apiResponse.ErrorResponse(res,constantMessage.constants.friend.FRIEND_REQUEST_NOT_FOUND);
                    }
                    else{
                        apiResponse.ErrorResponse(res,constantMessage.constants.friend.FRIEND_REQUEST_NOT_REJECTED);
                    }
                }
            }else{
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());
            }

        }catch (e) {
            console.log('Accept And Reject Friend Request error',e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    };

    async removeFriend(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateField(body.friendUserId)){
                let removeFriendResponse = await friendBAObj.removeFriendBA(req.userId,body.friendUserId);
                if(removeFriendResponse[0].message === constantMessage.constants.friend.FRIEND_REMOVED){
                    apiResponse.successResponse(res,constantMessage.constants.friend.FRIEND_REMOVED);
                }
                else if(removeFriendResponse[0].message === constantMessage.constants.friend.FRIEND_NOT_FOUND){
                    apiResponse.ErrorResponse(res,constantMessage.constants.friend.FRIEND_NOT_FOUND);
                }
                else {
                   apiResponse.ErrorResponse(res,constantMessage.constants.friend.FRIEND_NOT_REMOVED);
                }
            }else{
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());
            }
        }catch (e) {
            console.log("remove Friend error",e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    };

    async viewMyFriends(req,res){
      try{
          let viewMyFriendsRecord = await friendBAObj.viewMyFriendsBA(req.userId);
          if(viewMyFriendsRecord){
            apiResponse.successResponseWithData(res,constantMessage.constants.user.USERS_RECORDS_FOUND,viewMyFriendsRecord);
          }else{
              apiResponse.ErrorResponse(res,constantMessage.constants.user.USERS_RECORDS_NOT_FOUND);
          }
      }catch (e) {
          console.log('view My Friends error',e);
          apiResponse.internalServerErrorResponse(res,e);
      }
    };

    async viewMutualFriends(req,res){
        try{
            if(utilsObj.validateField(req.body.friendUserId)){
                let viewMutualFriendsRecords = await friendBAObj.viewMutualFriendsBA(req.userId,req.body.friendUserId);
                if(viewMutualFriendsRecords){
                    apiResponse.successResponseWithData(res,'MUTUAL_FRIENDS_FOUND',viewMutualFriendsRecords);
                }else{
                    apiResponse.ErrorResponse(res,'MUTUAL_FRIENDS_NOT_FOUND');
                }
            }else{
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());
            }

        }catch (e) {
            console.log('view mutual friends error ===>',e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    }

    async ViewFriendOfFriends(req,res){
        try{
            if(utilsObj.validateField(req.body.friendUserId)){
                let ViewFriendOfFriendsRecords = await friendBAObj.ViewFriendOfFriendsBA(req.userId,req.body.friendUserId);
                if(ViewFriendOfFriendsRecords){

                }else{

                }
            }
        }catch (e) {
            console.log("View Friend Of Friends ====>",e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    }
}

module.exports = new FriendController();
