FROM node:16.10-alpine
ARG configuration=production

WORKDIR /app
COPY package* ./

RUN npm install -g @angular/cli

COPY . .

RUN npm install

RUN npm run build -- --configuration $configuration
