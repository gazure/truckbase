FROM node:latest

RUN apt-get update && apt-get install -y postgresql-contrib postgresql-client libpq-dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
