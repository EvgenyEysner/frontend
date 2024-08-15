FROM node:18.13.0-alpine
WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "preview"]