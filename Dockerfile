FROM node:21-alpine3.18

COPY . /build

WORKDIR /build

RUN npm ci
RUN npm run build

FROM nginx:1.25.3

COPY --from=0 /build/dist/ /usr/share/nginx/html/
