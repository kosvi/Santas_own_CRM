FROM node:14-alpine

WORKDIR /usr/src/app

CMD ["npm", "run", "e2e"]