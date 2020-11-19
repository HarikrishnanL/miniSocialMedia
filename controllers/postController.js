const utilsObj = require("../helpers/utility");
const apiResponse = require("../helpers/apiResponse");
const postBAObj = require("../layers/businessLayer/postBA");
const constantMessage = require("../helpers/constants");


/*
Post controller modules involves:
1.create post
2.delete post
 */

class Post{

    async createUserPost(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateField(body.postDescription)){
                let insertPost = await postBAObj.insertPostBA(req.userId,body.postDescription);
                if(insertPost[0].message === constantMessage.constants.user.USER_POST_INSERTED){
                    apiResponse.successResponseWithData(res,constantMessage.constants.user.USER_POST_INSERTED,{postId:insertPost[0].post_Id});
                }else{
                 apiResponse.ErrorResponse(res,constantMessage.constants.user.USER_POST_NOT_INSERTED);
                }
            }else{
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());
            }
        }catch (e) {
            console.log("create User Post error ======>",e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    };

    async deleteUserPost(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateField(body.postId)){
                let deletePost = await postBAObj.deletePostBA(req.userId,body.postId);
                if(deletePost[0].message === constantMessage.constants.post.POST_DELETED){
                    apiResponse.successResponse(res,constantMessage.constants.post.POST_DELETED);
                }else if(deletePost[0].message === constantMessage.constants.post.POST_NOT_EXISTED){
                    apiResponse.notFoundResponse(res,constantMessage.constants.post.POST_NOT_EXISTED);
                }else{
                    apiResponse.ErrorResponse(res,constantMessage.constants.post.POST_NOT_DELETED)
                }
            }else{
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());

            }
        }catch (e) {
            console.log('delete User Post error',e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    }
}

module.exports = new Post();
