FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm ci

COPY . /app

RUN pwd

EXPOSE 9000

CMD ["npm", "run", "dev"]