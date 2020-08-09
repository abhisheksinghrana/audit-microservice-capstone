# Latest Build of Node version
FROM node:alpine

LABEL author="abhishek.rana@publicissapient.com"
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --only=prod
COPY . ./
RUN yarn build
CMD [ "yarn", "start:prod" ]
