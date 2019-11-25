FROM node:10-alpine as build

WORKDIR /usr/src/app
ADD . ./
RUN npm install
RUN npm run build

FROM nginx:1.17-alpine

COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
