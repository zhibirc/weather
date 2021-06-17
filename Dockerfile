# build assets for Front-end/Back-end
FROM node:14-alpine AS project-builder

WORKDIR /tmp/app

COPY public/ ./public
WORKDIR ./public
RUN npm ci
RUN npm run build
# remove useless stuff to minimize image
RUN rm -rf ./src ./node_modules package*.json

WORKDIR ../

COPY server/ ./server
WORKDIR ./server
RUN npm ci
RUN npm run build
# remove useless stuff to minimize image
RUN rm -rf ./src build-scripts/ package-lock.json tsconfig.json

WORKDIR ../


# deploy back-end
FROM project-builder AS back-end

LABEL maintainer="Yaroslav Surilov <ysurilov@domain.com>"
HEALTHCHECK --interval=10s --timeout=3s CMD wget -q -t1 -s 'http://localhost:3001/manage/health' || exit 1

USER node
ENV NODE_ENV=production

EXPOSE 8081/TCP
# run API server
#CMD ["node", "./server/dist/index.js"]


# deploy front-end
FROM nginx:alpine AS front-end

RUN rm -rf /usr/share/nginx/html/*
COPY public/* /usr/share/nginx/html
