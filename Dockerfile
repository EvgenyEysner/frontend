FROM node:18-alpine

WORKDIR /app

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --silent
RUN npm run build

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "preview"]