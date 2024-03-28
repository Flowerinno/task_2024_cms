# Kononov Aleksandr

## Estimate ~3.5 weeks (start date: 05.03.2024)

## Running the project

### Prerequisites

- Docker/Compose
- Node.js
- npm

### Start the project

- `npm run compose-dev` - build the project in development mode
  (To stop the docker containers - `npm run stop`).

The following commands are executed on the docker container:

- Start the cron job server -> `npm run cron`

Admin login credentials:

```
email: admin@gmail.com |
password: 1234 |
```

### Minio s3 compatible storage [(description here)](https://github.com/Flowerinno/task_2024_cms/tree/main/PROJECT/minio)

- Required access_key and secret_key, navigate to localhost:9000, login with provided credentials and create the keys.

### Testing with Cypress (partial)

Covered auth, tags, post draft and actual creation. Just learning the tool.

- `npm run compose-dev` - build the project 
- `npm run cypress:open` - run the tests
