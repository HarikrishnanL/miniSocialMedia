const authenticationDAObj = require("../dataLayers/authenticationDA");

class AuthenticationBA{

    async registerUserBA(userName,userEmail,password){
        return await authenticationDAObj.registerUserDA(userName,userEmail,password);
    };

    async loginUserBA(userEmail,password){
        return await authenticationDAObj.loginUserDA(userEmail,password);
    };

    async findUserBA(userEmail){
        return await authenticationDAObj.findUserDA(userEmail);
    };

    async insertNewPasswordBA(userEmail,newPassword){
        return await authenticationDAObj.insertNewPasswordDA(userEmail,newPassword);
    };

    async updateProfileBA(userName,userId,pic){
        return await authenticationDAObj.updateProfileDA(userName,userId,pic);
    }



}

module.exports = new AuthenticationBA();
