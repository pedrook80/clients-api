FROM node:18

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

COPY wait-for-mysql.sh /app/wait-for-mysql.sh

RUN chmod +x /app/wait-for-mysql.sh

EXPOSE 3000

CMD /app/wait-for-mysql.sh -- npm run migrate && npm start
