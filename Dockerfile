#
# Copyright (c) 2018-present, NDLA.
#
# This source code is licensed under the GPLv3 license found in the
# LICENSE file in the root directory of this source tree.
#
#
FROM node:10.14.1-alpine

ENV PORT 80
ENV HOME=/home/app
ENV APP_PATH=$HOME/explainations-and-terms-frontend

# Copy necessary files for installing dependencies
COPY package.json $APP_PATH/
COPY yarn.lock $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN yarn --production

# Copy necessary source files for server and client build
COPY .babelrc razzle.config.js postcss.config.js $APP_PATH/

COPY src $APP_PATH/src
COPY public $APP_PATH/public

EXPOSE 80

# Build client code
ENV NODE_ENV=production
WORKDIR $APP_PATH
RUN yarn run build

CMD yarn run start:prod