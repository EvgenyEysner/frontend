FROM node

WORKDIR /app

COPY . .
RUN npm i --force
RUN npm run build

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 3000

CMD ["npm", "run", "preview"]