FROM node:14

WORKDIR /usr/src/app

COPY . .

ENV PORT=$PORT
ENV REACT_APP_API_BASE=/api/

RUN npm install --production --prefix client && \
    npm install --prefix server && \
    npm run build --prefix client && \
    npm run build --prefix server && \
    npm prune --production --prefix server && \
    rm -rf client 

CMD ["npm", "start", "--prefix", "server"]
