FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm i --omit=dev --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:alpine as frontend
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]