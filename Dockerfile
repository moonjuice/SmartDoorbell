FROM node:14.16.0-alpine
WORKDIR /usr/app
COPY ./package-lock.json ./
COPY ./package.json ./
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps
COPY ./*.js ./
EXPOSE 1883
RUN mkdir data
CMD ["npm", "start"]
