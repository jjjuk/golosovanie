FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g serve

RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]