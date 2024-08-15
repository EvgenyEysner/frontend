FROM node:18.13.0-alpine
WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "preview"]
# Verwenden Sie das offizielle Nginx-Bild als Basisbild
# FROM nginx:alpine

# # Kopieren Sie die Build-Dateien Ihrer React-PWA in das Nginx-Webverzeichnis
# COPY dist /usr/share/nginx/html

# # Kopieren Sie die benutzerdefinierte Nginx-Konfigurationsdatei
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Exponieren Sie Port 80 für HTTP
# EXPOSE 80

# # Starten Sie Nginx, wenn der Container startet
# CMD ["nginx", "-g", "daemon off;"]

