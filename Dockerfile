FROM node:10.13.0

MAINTAINER jinhyeokfang <jinhyeokfang@gmail.com>

RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install

ENV NODE_ENV development

EXPOSE 80

CMD ["npm", "run", "dev"]