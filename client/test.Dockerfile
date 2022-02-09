FROM node:14-alpine

WORKDIR /usr/src/app

CMD ["npm", "test", "--", "--coverage"]
