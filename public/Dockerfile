#-------------------------------------------------------
# Build and deploy front-end.
#-------------------------------------------------------

FROM node:14-alpine AS build

COPY . .
RUN chmod u+x build.sh
RUN npm run build


FROM nginx:alpine AS production

LABEL maintainer="Yaroslav Surilov <ysurilov@domain.com>"
HEALTHCHECK --interval=10s --timeout=3s CMD wget -q -t1 -s 'http://localhost:80/manage/health' || exit 1

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /dist/* /usr/share/nginx/html
