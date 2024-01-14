FROM node:21-alpine3.18

RUN apk add yarn

COPY . /build

WORKDIR /build

RUN yarn install --frozen-lockfile
RUN yarn run build

FROM nginx:1.25.3

COPY --from=0 /build/dist/ /usr/share/nginx/html/
