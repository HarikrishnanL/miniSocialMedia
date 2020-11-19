const redis = require('redis');
const port_redis = 6379;
const redis_client = redis.createClient(port_redis);

redis_client.on("connect", (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("successfully connected to redis_server")
    }
});

module.exports = redis_client;
