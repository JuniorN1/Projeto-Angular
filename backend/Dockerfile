FROM node:14


WORKDIR /usr/app

COPY package*.json ./

RUN yarn


COPY . .


EXPOSE 3333

RUN chmod 777 ./init.sh

ENTRYPOINT ["./init.sh"]

