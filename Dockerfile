#The first thing we need to do is define from what image we want to build from. Here we will use the latest LTS (long term support) version 14 of node available from the Docker Hub
FROM node:14

#Create a directory to hold the application code inside the image, this will be the working directory for your application:
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]