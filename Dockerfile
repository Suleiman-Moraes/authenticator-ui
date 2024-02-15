FROM node:20.11.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build-prod

FROM nginx:1.21.3-alpine

COPY --from=build /app/dist/authenticator-ui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
