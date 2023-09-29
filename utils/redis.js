const redis = require("redis");

class RedisClient {

    constructor () {
        this.client = redis.createClient()

        // Listen for redis client error
        this.client.on('error', (error) => (
            console.error('Redis client Error:', error)
        ))
    }

    isAlive() {
        return new Promise((resolve) => {
            this.client.ping((error, reply) => {
                if (error || reply !== 'PONG') {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        }).catch((error) => {
            console.error('Error in isAlive:', error);
            throw error;
        });
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, reply) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(reply);
                }
            });
        }).catch((error) => {
            console.error('Error in get:', error);
            throw error; // Re-throw the error to propagate it further
        });
    }

    async set(key, value, durationInSeconds) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, durationInSeconds, value, (error, reply) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(reply);
                }
            });
        }).catch((error) => {
            console.error('Error in set:', error);
            throw error; // Re-throw the error to propagate it further
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (error, reply) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(reply);
                }
            });
        }).catch((error) => {
            console.error('Error in del:', error);
            throw error; // Re-throw the error to propagate it further
        });
    }
}

const redisClient = new RedisClient();
export default redisClient;