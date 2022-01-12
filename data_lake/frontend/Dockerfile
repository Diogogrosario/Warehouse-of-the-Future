FROM node:16.13.1

RUN mkdir -p /app/frontend
WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY public/ public/
COPY src/ src/

CMD ["npm", "start"]
