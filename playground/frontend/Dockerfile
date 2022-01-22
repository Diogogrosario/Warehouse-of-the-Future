FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Add node_modules/.bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy all files from current directory to container
COPY . ./

# Start app
EXPOSE 3000

CMD ["yarn", "start"]