FROM node:10-jessie-slim

WORKDIR /code
COPY ./code .

RUN chmod +x wait_mysql.sh
RUN npm install --production

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
