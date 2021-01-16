FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm ci

COPY . /app

RUN pwd

EXPOSE 8000

CMD ["npm", "start"]