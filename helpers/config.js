exports.MONGO_DB_CONFIG = {
	TEST:"mongodb://localhost:27017/media",
};

exports.MYSQL_DB_CONFIG = {
    LOCAL:{
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000,
        host: "127.0.0.1",
        user: "root",
        password: "password",
        port: "3306",
        connectionLimit: 20,
        multipleStatements: true,
        maxIdleTime: 30,
        database: "mediaDB",
        insecureAuth: true
    }
};
