FROM node:14.16.0-alpine
WORKDIR /usr/app
COPY ./app/package-lock.json ./
COPY ./app/package.json ./
RUN npm install
COPY ./app/*.js ./
EXPOSE 1883
RUN mkdir data
CMD ["npm", "start"]