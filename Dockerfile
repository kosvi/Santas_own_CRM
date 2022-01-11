FROM node:14

WORKDIR /usr/src/app

COPY . .

ENV PORT=$PORT
ENV REACT_APP_API_BASE=/api/

RUN npm install --prefix client && \
    npm install --prefix server && \
    npm build --prefix client && \
    npm build --prefix server

EXPOSE $PORT

CMD ["npm", "start", "--prefix", "server"]
