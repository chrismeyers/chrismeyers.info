FROM node:15.11.0

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .
RUN npm run build

EXPOSE 8888
ENTRYPOINT ["node", "src/server.js"]
