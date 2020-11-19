const db = require("../../config/database-connection");

class FriendDA{

    async viewAllUsersDA(userId){
        let params = [userId];
        let viewAllUsersRecords =await db.query(' CALL view_all_users_details(?)',params);
        return viewAllUsersRecords[0];
    };

    async sendFriendRequestDA(userId,friendUserId){
        let params = [userId,friendUserId];
        let sendFriendRequestResponse = await db.query('CALL send_friend_request(?,?)',params);
        return sendFriendRequestResponse[0];
    };

    async acceptFriendDA(userId,friendUserId){
        let params = [userId,friendUserId];
        let acceptFriendRequestResponse = await db.query('CALL accept_friend_request(?,?)',params);
        return acceptFriendRequestResponse[0];
    };

    async rejectFriendDA(userId,friendUserId){
        let params = [userId,friendUserId];
        let rejectFriendRequestResponse = await db.query('CALL reject_friend_request(?,?)',params);
        return rejectFriendRequestResponse[0];
    };

    async removeFriendDA(userId,friendUserId){
        let params = [userId,friendUserId];
        let removeFriendResponse = await db.query('CALL remove_friend(?,?)',params);
        return removeFriendResponse[0];
    };

    async viewMyFriendsDA(userId){
        let params = [userId];
        let viewMyFriendsRecords = await db.query('CALL get_my_friends(?)',params);
        return viewMyFriendsRecords[0];
    };

    async viewMutualFriendsDA(userId,friendUserId){
        let params = [userId,friendUserId];
        let viewMutualFriendsRecords = await db.query('CALL view_mutual_friends(?,?) ',params);
        return viewMutualFriendsRecords[0];
    };

    async ViewFriendOfFriendsDA(userId,friendUserId){
        let params = [userId,friendUserId];
        let ViewFriendOfFriendsRecords = await db.query('CALL view_friends_of_friends(?,?) ',params);
        return ViewFriendOfFriendsRecords[0];
    };

};
module.exports = new FriendDA();
