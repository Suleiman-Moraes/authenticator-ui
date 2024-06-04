FROM node:20.11.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.3-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/authenticator-ui /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
