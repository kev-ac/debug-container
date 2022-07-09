FROM node:18-alpine

LABEL org.opencontainers.image.authors="https://github.com/kev-ac"

ENV NODE_ENV=production
ENV PORT=80

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production

COPY . .

CMD [ "node", "index.js" ]
