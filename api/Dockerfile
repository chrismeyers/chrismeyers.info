FROM node:16.3.0-slim

WORKDIR /resume
ADD resume/ ./

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY ./ .

EXPOSE 8888
CMD ["node", "src/server.js"]
