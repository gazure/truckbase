FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set legacy-peer-deps true && \
    npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
