# Kononov Aleksandr [Task 2024006](https://cloud.devit.group/apps/files/?dir=/&openfile=2751712)

## Estimate ~3 weeks of work (ideal - 31.03.2024)

## All information related to project structure and implementation details is in the [PROJECT folder](https://github.com/Flowerinno/task_2024_cms/tree/main/PROJECT/database)

## Running the project

1. `docker-compose -f docker-compose.dev.yml up` - to start the project in development mode
2. `docker-compose -f docker-compose.prod.yml up` - to start the project in production mode

(To stop the docker container use `docker-compose down`)

- To seed database `npm install -D typescript ts-node @types/node` -> `npx prisma db seed`
