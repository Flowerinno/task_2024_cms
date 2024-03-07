# Run redis container

docker run -d --name my-redis-container -p 6379:6379 -v /path/to/local/dаta:/root/redis -v /path/to/local/redis.conf:/usr/local/etc/redis/redis.conf -e REDIS_PASSWORD=redis_pass -e REDIS_PORT=6379 -e REDIS_DATABASES=16 redis:latest
