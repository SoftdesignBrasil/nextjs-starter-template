FROM node:10-jessie-slim

WORKDIR /code
COPY ./code .

RUN npm install --production

ENTRYPOINT [ "npm" ]
CMD [ "start" ]