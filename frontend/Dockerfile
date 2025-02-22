FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build \
  && rm -rf ./src \
  && rm -rf node ./node_modules


FROM nginx:1.23.1-alpine AS frontend
WORKDIR /app

COPY --from=builder /app/build ./usr/share/nginx/html
COPY ./nginx/conf.d/default.conf ./etc/nginx/conf.d/default.conf
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]