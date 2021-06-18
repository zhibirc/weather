#-------------------------------------------------------
# Build and deploy back-end.
#-------------------------------------------------------

FROM node:14-alpine AS project-builder

WORKDIR /tmp/app

COPY . .
RUN npm ci
RUN npm run build
# remove useless stuff to minimize image
RUN rm -rf ./src build-scripts/ package-lock.json tsconfig.json


FROM project-builder AS back-end

LABEL maintainer="Yaroslav Surilov <ysurilov@domain.com>"
HEALTHCHECK --interval=10s --timeout=3s CMD wget -q -t1 -s 'http://localhost:8081/manage/health' || exit 1

USER node
ENV NODE_ENV=production

EXPOSE 8081/TCP

CMD ["node", "./dist/index.js"]
