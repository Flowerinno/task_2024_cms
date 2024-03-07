# Kononov Aleksandr [Task 2024006](https://cloud.devit.group/apps/files/?dir=/&openfile=2751712)

## Estimate ~3.5 weeks of work (05.03.2024 - 31.03.2024)

## All information related to project structure and implementation details is in the [PROJECT folder](https://github.com/Flowerinno/task_2024_cms/tree/main/PROJECT/database)

## Running the project

1. Running in DEVELOPMENT mode

- `docker network create my-network` - to create a network
- `docker-compose -f docker-compose.dev.yml up` - build the project in development mode

2. Running in PRODUCTION MODE

- `docker network create my-network` - to create a network
- `docker-compose -f docker-compose.prod.yml up` - build the project in production mode

(To stop the docker container use `docker-compose down`)

- Seed the database -> `npx prisma db seed`

## Project features

### `USERS`

- User authentication/authorization
- User roles
- User permissions
- User settings

  - CRUD operations for users
  - ROLES operations (block / graceful deletion)
  - Pagination/Filtering users list

### `RSS FEED`

-- in progress --

### `Ads`

-- in progress --
