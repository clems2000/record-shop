## ---- Base Stage ----
#FROM node:18.6.1 AS build
#WORKDIR /app
#COPY package*.json ./
#
## ---- Build Stage ----
#FROM base AS build
#RUN npm install
#COPY . .
#
#
## ---- Release Stage ----
#FROM node:18.6.1-alpine AS release
#COPY --from=build /app .
#EXPOSE 5173
#CMD ["node", "main.js"]







# ---- Base Stage ----
FROM node:18 AS build

COPY . /app

RUN cd app \
    && npm install \
    && npm run build

# ---- Build Stage ---- inside nginx image / docker container
FROM nginx

#RUN rm -rf /etc/nginx/conf.d/*
#
#COPY deploy/docker/record-shop/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm /usr/share/nginx/html/*

COPY --from=build app/dist /usr/share/nginx/html

EXPOSE 80