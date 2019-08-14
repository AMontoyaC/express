FROM node:10.4-slim

# NPM config
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
RUN mkdir -p /opt/backend

WORKDIR /opt/backend

# Bundle app source
COPY . /opt/backend

# Give permissions
RUN chown -R node:node /opt/backend/*

# Install app dependencies
RUN npm install

# network ports
EXPOSE 3000

# Add user
USER node

CMD [ "node", "app/app.js" ]
