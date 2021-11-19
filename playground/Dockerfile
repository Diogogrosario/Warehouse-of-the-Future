FROM node:lts-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all the files from current directory into the container
COPY . .

EXPOSE 9000
