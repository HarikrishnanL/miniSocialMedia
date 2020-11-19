const redisClient = require("../config/redis-connection");
const { promisify } = require('util');
const redisGet = promisify(redisClient.get).bind(redisClient);
const utilObj = require("../helpers/utility");
const apiResponse = require("../helpers/apiResponse");
const constantMessage = require("../helpers/constants");


class SessionValidator{

    async validateWebSession(req, res, next){
        let authtoken = req.header('authToken') || req.query.token;
        if(utilObj.validateField(authtoken)){
            let data = await redisGet(authtoken);
            if(data){
                data = JSON.parse(data);
                req.userId = data.userId;
                req.userEmail = data.userEmail;
                return next();
            }else{
                apiResponse.ErrorResponse(res,constantMessage.constants.user.USER_SESSION_EXPIRED);
            }
        }else{
            apiResponse.invalidPayloadErrorResponse(res,constantMessage.constants.user.invalid_Payload);
        }
    }
};

module.exports = new SessionValidator();
