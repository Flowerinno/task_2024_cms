FROM node:21-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci && npm cache clean --force

COPY . .

EXPOSE 5173

# CMD ["npm", "run", "dev"] 