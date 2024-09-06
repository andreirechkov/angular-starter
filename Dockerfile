# Stage 1: Use Node.js image as the base image
FROM node:16-alpine as build
ARG configuration=production

WORKDIR /app

# Copy necessary files for dependency installation
COPY package.json package-lock.json angular.json

RUN npm install -g @angular/cli

COPY . .

RUN npm i

# Build the Angular app with configuration
RUN npm run build -- --configuration $configuration

# Stage 2: Create a new image with a smaller base image (NGINX)
FROM nginx:1.25.3-alpine-slim

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/co-fe-v2 /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
