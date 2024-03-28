FROM node:21-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci && npm cache clean --force

COPY . .

# CMD ["npm", "run", "dev"] 