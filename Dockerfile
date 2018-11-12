
FROM node:9.4.0-alpine as client
ARG CONCEPT_API_URL=NO_VALUE_FOR_API
ENV REACT_APP_CONCEPT_API_ROOT=${CONCEPT_API_URL}

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install -qy
COPY client/ ./
RUN npm run build-css
RUN REACT_APP_CONCEPT_API_ROOT=${REACT_APP_CONCEPT_API_ROOT} npm run build

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