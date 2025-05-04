FROM node:18

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait.sh /wait.sh

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN chmod +x /wait.sh

EXPOSE 3000

CMD ["/wait.sh", "/entrypoint.sh"]
