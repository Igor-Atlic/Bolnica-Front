FROM node:17-alpine3.14

LABEL org.opencontainers.image.source https://github.com/RAF-SI-2021/Bolnica-Front

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY . ./

CMD ["npm", "start"]