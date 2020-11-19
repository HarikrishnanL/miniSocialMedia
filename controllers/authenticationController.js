const utilsObj= require("../helpers/utility");
const { promisify } = require("util");
const redisClient = require("../config/redis-connection");
const redisGet = promisify(redisClient.get).bind(redisClient);
const apiResponse = require("../helpers/apiResponse");
const constantMessage = require("../helpers/constants");
const authenticationBAObj = require("../layers/businessLayer/authenticationBA");
// const multer  = require('multer');
// const upload = multer({dest:'/uploads/'});


/*
Authentication controller modules involves:
1.Login
2.Register
3.Forgot password
4.Profile update with profile pic -- Pending
 */


class Authentication{

    async registerUser(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateField(body.userName) && utilsObj.validateLoginEmailField(body.userEmail) && utilsObj.validateField(body.password)){
                let registerUserResponse = await authenticationBAObj.registerUserBA(body.userName,body.userEmail,body.password);
                if(registerUserResponse[0].message === constantMessage.constants.user.USER_RECORDS_INSERTED){
                    apiResponse.successResponseWithData(res,registerUserResponse[0].message,registerUserResponse[0].user_Id);
                }
                else if(registerUserResponse[0].message === constantMessage.constants.user.USER_ALREADY_EXISTED){
                    apiResponse.ErrorResponse(res,constantMessage.constants.user.USER_ALREADY_EXISTED);
                }
                else{
                    apiResponse.ErrorResponse(res,constantMessage.constants.user.USER_RECORDS_NOT_INSERTED);
                }
            }else{
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());
            }
        }catch (e) {
            console.log("Register user error =====>",e);
            apiResponse.internalServerErrorResponse(res,e);

        }
    };

    async loginUser(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateLoginEmailField(body.userEmail) && utilsObj.validateField(body.password)){

                let loginUserResponse = await authenticationBAObj.loginUserBA(body.userEmail,body.password);
                if(loginUserResponse && loginUserResponse !== constantMessage.constants.user.USER_NOT_FOUND && loginUserResponse !== constantMessage.constants.user.USER_PASSWORD_NOT_MATCHING ){
                    let toEncrypt = (constantMessage.constants.Session.Web_Prefix+loginUserResponse.userId+loginUserResponse.userEmail+new Date().getMilliseconds()).toString();
                    let session = await utilsObj.encryptPassword(toEncrypt);
                    let redisData = {
                        userId:loginUserResponse.userId,
                        userEmail:loginUserResponse.userEmail
                    };
                    await redisClient.set(session,JSON.stringify(redisData));
                    apiResponse.successResponseWithSession(res,session,loginUserResponse);
                }
                else{
                    apiResponse.notFoundResponse(res,constantMessage.constants.user.USER_NOT_FOUND);
                }

            }else {
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());
            }
        }catch (e) {
            console.log("login user error ======>",e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    };

    async forgotPassword(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateLoginEmailField(body.email)){
                let findUserResponse = await authenticationBAObj.findUserBA(body.email);
                if(findUserResponse){
                    let forgetPinNumber = await utilsObj.generateRandomSixDigitNumber();
                    let redisKey = findUserResponse[0].userId + constantMessage.constants.ForgetPasswordMessages.otpNumber;
                    let redisExpiryTimer = constantMessage.constants.ForgetPasswordMessages.expiryTimer;
                    let redisValue = forgetPinNumber;
                    await redisClient.setex(redisKey, redisExpiryTimer, redisValue);
                    apiResponse.successResponse(res,{otpNumber:redisValue});
                }else {
                    apiResponse.notFoundResponse(res,constantMessage.constants.user.USER_NOT_FOUND);
                }

            }else {
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());
            }

        }catch (e) {
            console.log("forgot Password error =======>",e);
            apiResponse.internalServerErrorResponse(res,e);


        }
    };

    async passwordChange(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateField(body.newPassword) && utilsObj.validateLoginEmailField(body.userEmail) && utilsObj.validateField(body.otpNumber)){
                let userRecord = await authenticationBAObj.findUserBA(body.userEmail);
                if(userRecord){
                    let redisKey = userRecord[0].userId+constantMessage.constants.ForgetPasswordMessages.otpNumber;
                    let redisOtpNumber = await redisGet(redisKey);
                    console.log("otpNumber",redisOtpNumber);
                    if(JSON.parse(redisOtpNumber) === body.otpNumber){
                        let insertNewPasswordResponse  = await authenticationBAObj.insertNewPasswordBA(body.userEmail,body.newPassword);
                        if(insertNewPasswordResponse[0].message === constantMessage.constants.user.USER_NEW_PASSWORD_INSERTED){
                            apiResponse.successResponse(res,constantMessage.constants.user.USER_NEW_PASSWORD_INSERTED);

                        }else if(insertNewPasswordResponse[0].message === constantMessage.constants.user.USER_DOESNT_EXIST){
                            apiResponse.notFoundResponse(res,constantMessage.constants.user.USER_NOT_FOUND);
                        }else{
                            apiResponse.ErrorResponse(res,constantMessage.constants.user.USER_NEW_PASSWORD_NOT_INSERTED);
                        }

                    }else{
                        apiResponse.ErrorResponse(res,constantMessage.constants.ForgetPasswordMessages.OTP_NOT_MATCHING)
                    }
                }else{
                    apiResponse.notFoundResponse(res,constantMessage.constants.user.USER_NOT_FOUND);
                }
            }else{
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());
            }
        }catch (e) {
            console.log("password Change error",e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    };

    async profileUpdate(req,res){
        try{
            let body = req.body;
            if(utilsObj.validateField(body.userName)){
                let updateProfileResponse = await authenticationBAObj.updateProfileBA(body.userName,req.userId,req.file.path);
                if(updateProfileResponse[0].message === constantMessage.constants.user.USER_PROFILE_UPDATED){
                    apiResponse.successResponse(res,constantMessage.constants.user.USER_PROFILE_UPDATED);
                }else if(updateProfileResponse[0].message === constantMessage.constants.user.USER_NOT_FOUND){
                    apiResponse.ErrorResponse(res,constantMessage.constants.user.USER_NOT_FOUND)
                }else{
                 apiResponse.ErrorResponse(res,constantMessage.constants.user.USER_PROFILE_NOT_UPDATED);
                }
            }else{
                apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload.toString());

            }

        }catch (e) {
            console.log("profile Update error",e);
            apiResponse.internalServerErrorResponse(res,e);
        }
    }
}

module.exports = new Authentication();
