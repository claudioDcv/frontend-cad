# ---- Etapa de compilación ----
FROM node:22-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# ⚠️ Instalar dependencias faltantes necesarias para el build
RUN npm install --save-dev @testing-library/jest-dom vitest @vitejs/plugin-react && \
    npm install --save vite

# Copiar código fuente
COPY . .

# Ejecutar build de Vite
RUN npm run build

# ---- Etapa de producción ----
FROM nginx:alpine

# Copiar build desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto de nginx
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]