const friendDAObj = require("../dataLayers/friendDA");

class FriendBA{

    async viewAllUsersBA(userId){
        return await friendDAObj.viewAllUsersDA(userId);
    };

    async sendFriendRequestBA(userId,friendUserId){
        return await friendDAObj.sendFriendRequestDA(userId,friendUserId);
    };

    async acceptFriendBA(userId,friendUserId){
        return await friendDAObj.acceptFriendDA(userId,friendUserId);
    };

    async rejectFriendBA(userId,friendUserId){
        return await friendDAObj.rejectFriendDA(userId,friendUserId);
    };

    async removeFriendBA(userId,friendUserId){
        return await friendDAObj.removeFriendDA(userId,friendUserId);
    };

    async viewMyFriendsBA(userId){
        return await friendDAObj.viewMyFriendsDA(userId);
    };

    async viewMutualFriendsBA(userId,friendUserId){
        return await friendDAObj.viewMutualFriendsDA(userId,friendUserId);
    };

    async ViewFriendOfFriendsBA(userId,friendUserId){
        return await friendDAObj.ViewFriendOfFriendsDA(userId,friendUserId);
    }

};

module.exports = new FriendBA();
