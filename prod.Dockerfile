FROM node:14-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_API_BASE=/api

RUN npm install --prefix client && \
    npm install --prefix server && \
    npm run build --prefix client && \
    npm run build --prefix server && \
    rm -rf server/node_modules

FROM node:14-alpine 

COPY --from=build-stage /usr/src/app/server /usr/src/app

WORKDIR /usr/src/app

RUN npm install --production

CMD ["npm", "start"]
