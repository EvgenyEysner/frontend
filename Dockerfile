FROM node:18-alpine

WORKDIR /app

EXPOSE 3000

COPY package.json package-lock.json ./
COPY . ./

RUN npm install --silent
RUN npm run build


EXPOSE 3000

CMD ["npm", "run", "preview"]