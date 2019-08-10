FROM node:alpine

WORKDIR /app/server

COPY . /app

RUN npm install

EXPOSE 8080
EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]