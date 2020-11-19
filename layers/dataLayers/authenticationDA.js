const db = require("../../config/database-connection");
const utilsObj = require("../../helpers/utility");
const constantMessage = require("../../helpers/constants");

class AuthenticationDA{

    async registerUserDA(userName,userEmail,password){
        let encryptedUserPassword = await utilsObj.encryptPassword(password);
        let params = [userName,userEmail,encryptedUserPassword];
        let insertUserRecord = await db.query('CALL register_user_details(?,?,?)',params);
        return insertUserRecord[0]
    };

    async loginUserDA(userEmail,password){
        let params = [userEmail];
        let findUser = await db.query('CALL get_user_details(?)',params);
        let userRecords = findUser[0][0];
        if(userRecords && userRecords.userPassword){
            const match = await utilsObj.comparePassword(password,userRecords.userPassword);
            if(match){
                delete userRecords.userPassword;
                return userRecords;
            }else{
                return constantMessage.constants.user.USER_PASSWORD_NOT_MATCHING;
            }
        }else{
            return constantMessage.constants.user.USER_NOT_FOUND;
        }
    };

    async findUserDA(userEmail){
        let params = [userEmail];
        let findUser = await db.query('CALL get_user_details(?)',params);
        return findUser[0];
    };

    async insertNewPasswordDA(userEmail,newPassword){
        let encryptedPassword = await utilsObj.encryptPassword(newPassword);
        let params = [userEmail,encryptedPassword];
        let insertNewPassword = await db.query('CALL insert_user_new_password(?,?)',params);
        return insertNewPassword[0];
    };

    async updateProfileDA(userName,userId,picPath){
        let params = [userName,userId,picPath];
        let updateProfile = await db.query('CALL profile_Update(?,?,?)',params);
        return updateProfile[0];
    }

}

module.exports = new AuthenticationDA();
