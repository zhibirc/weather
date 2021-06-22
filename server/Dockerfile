#-------------------------------------------------------
# Build and deploy back-end.
#-------------------------------------------------------

FROM node:14-alpine AS build

WORKDIR /tmp/app

COPY . .
RUN npm ci \
    && npm run build \
    && rm -rf src/ build-scripts/ .env.tpl package-lock.json tsconfig.json


FROM build AS production

LABEL maintainer="Yaroslav Surilov <ysurilov@domain.com>"
HEALTHCHECK --interval=10s --timeout=3s CMD wget -q -t1 -s 'http://localhost:8081/manage/health' || exit 1

USER node
ENV NODE_ENV=production

EXPOSE 8081/TCP

CMD ["node", "./dist/index.js"]
