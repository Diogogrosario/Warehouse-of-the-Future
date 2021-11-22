FROM node:14.18.1

WORKDIR /app

COPY package.json .

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

CMD ["npm", "start"]
