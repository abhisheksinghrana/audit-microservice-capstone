# Latest Build of Node version
FROM node:alpine

LABEL author="Abhishek Rana"
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --only=prod
RUN yarn test
COPY . ./
RUN yarn build
CMD [ "yarn", "start:prod" ]
