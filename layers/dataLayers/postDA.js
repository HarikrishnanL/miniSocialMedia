const db = require("../../config/database-connection");

class PostDA{

    async insertPostDA(userId,postDescription){
        let params = [userId,postDescription];
        let insertPostRecord = await db.query('CALL insert_post(?,?)',params);
        return insertPostRecord[0];
    };

    async deletePostDA(userId,postId){
        let params = [userId,postId];
        let deletePostRecord = await db.query('CALL delete_post(?,?)',params);
        return deletePostRecord[0];
    };

}

module.exports = new PostDA();
