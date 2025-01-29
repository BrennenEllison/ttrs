FROM node:18-alpine AS build
RUN mkdir "app"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:development

FROM nginx:1.23-alpine
RUN apk add --no-cache gettext # Required for envsubst
COPY --from=build /app/dist/ui /user/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY src/assets/config.js.template /user/share/nginx/html/assets/config.js
COPY entrypoint.sh user/bin/entrypoint.sh
RUN chmod +x /user/bin/entrypoint.sh
EXPOSE 80
ENTRYPOINT ["user/bin/entrypoint.sh"]