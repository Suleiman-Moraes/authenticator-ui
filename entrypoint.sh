#!/bin/sh

# Replace placeholders in the environment.prod.ts file
sed -i "s|API_URL_PLACEHOLDER|${ENV_API_URL}|g" /usr/share/nginx/html/main.*.js
sed -i "s|BASIC_TOKEN_PLACEHOLDER|${ENV_BASIC_TOKEN}|g" /usr/share/nginx/html/main.*.js

# Start Nginx
nginx -g 'daemon off;'
