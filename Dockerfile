FROM node:11.10.0-alpine as builder

WORKDIR /rps-web

COPY package.json .
COPY yarn.lock .

RUN yarn --prod

COPY public/ ./public
COPY src/ ./src

RUN yarn run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /rps-web/build /usr/share/nginx/html