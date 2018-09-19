
FROM node:9.4.0-alpine as client

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install -qy
COPY client/ ./
RUN npm run build

# Setup the server

FROM node:9.4.0-alpine

WORKDIR /usr/app/

WORKDIR /usr/app/server/
COPY --from=client /usr/app/client/build/ ./client/build/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 80

EXPOSE 80

CMD npm run start-production