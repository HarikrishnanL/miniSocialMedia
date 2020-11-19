const postDAObj = require("../dataLayers/postDA");

class PostBA{
    async insertPostBA(userId,postDescription){
        return await postDAObj.insertPostDA(userId,postDescription);
    }

    async deletePostBA(userId,postId){
        return await postDAObj.deletePostDA(userId,postId);
    }
};

module.exports = new PostBA();

