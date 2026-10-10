# Etapa 1: Construcción (Usamos Node.js)
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código (incluyendo tu archivo .env local)
COPY . .

# Compilamos la aplicación de React (Vite creará la carpeta /dist)
RUN npm run build

# Etapa 2: Servidor Web (Usamos Nginx)
FROM nginx:alpine

# Borramos la página por defecto que trae Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos nuestra carpeta /dist ya compilada a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Le decimos a Nginx que redirija todas las rutas a index.html (Clave para React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 (el puerto web por defecto)
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]