FROM node:20.11.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY set-env.sh ./
RUN chmod +x set-env.sh && ./set-env.sh

RUN npm run build

FROM nginx:1.21.3-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/authenticator-ui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
