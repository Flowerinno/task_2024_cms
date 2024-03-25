FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

COPY . .

RUN npm install

#RUN npx prisma migrate dev --name init  && npx prisma db seed

# Run the cron job in a separate shell
CMD ["npm", "run", "dev"] 
#& npm run cron