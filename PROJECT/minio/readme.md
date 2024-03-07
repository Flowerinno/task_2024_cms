# Minio file storage

- Used as alternative to AWS S3 inside docker containers. - [DOCS](https://min.io/download#/docker)

## Usage

- `mkdir -p ~/minio/data` # Create a directory to store data (will be mounted to minio container to `/data` folder)

- ```docker run \
   -p 9000:9000 \
   -p 9001:9001 \
   --name minio \
   -v ~/minio/data:/data \
   -e "MINIO_ROOT_USER=minio_user" \
   -e "MINIO_ROOT_PASSWORD=minio_password" \
   quay.io/minio/minio server /data --console-address ":9001"
  ```

### Minio console

After running the container, you can access the minio console at `http://127.0.0.1:9000` and login with the credentials provided in the `docker run` command.

## NPM package to interact with Minio

- `npm install --save minio @types/minio`
