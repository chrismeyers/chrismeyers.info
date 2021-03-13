FROM node:15.11.0

WORKDIR /resume
ADD resume/ ./

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .

EXPOSE 8888
ENTRYPOINT ["npm", "start"]
