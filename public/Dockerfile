#-------------------------------------------------------
# Build and deploy front-end.
#-------------------------------------------------------

FROM node:14-alpine AS project-builder

WORKDIR /tmp/app

COPY . .
RUN npm ci
RUN npm run build
# remove useless stuff to minimize image
RUN rm -rf ./src ./node_modules package*.json


FROM nginx:alpine AS front-end

LABEL maintainer="Yaroslav Surilov <ysurilov@domain.com>"
HEALTHCHECK --interval=10s --timeout=3s CMD wget -q -t1 -s 'http://localhost:80/manage/health' || exit 1

RUN rm -rf /usr/share/nginx/html/*
COPY dist/* /usr/share/nginx/html
