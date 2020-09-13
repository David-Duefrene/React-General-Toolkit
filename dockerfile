FROM node:14

WORKDIR /

COPY . .
RUN npm i --silent react@16.13.1
RUN npm i --silent react-dom@16.13.1
RUN npm install --silent

EXPOSE 3000
CMD npm ci
