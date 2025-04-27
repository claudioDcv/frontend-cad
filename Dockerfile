# ---- Etapa de compilación ----
    FROM node:22-alpine AS builder

    WORKDIR /build
    
    # Copiar package.json y package-lock.json
    COPY package*.json ./
    
    # Instalar dependencias
    RUN npm install
    
    # Copiar el resto del código fuente
    COPY . .
    
    # Construir la aplicación (genera la carpeta /build/dist)
    RUN npm run build
    
    # ---- Etapa de ejecución ----
    FROM nginx:alpine
    
    # Copiar los archivos estáticos construidos al nginx
    COPY --from=builder /build/dist /usr/share/nginx/html
    
    # Opcional: tu configuración customizada de Nginx
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Exponer el puerto (Nginx corre en 80)
    EXPOSE 80
    
    # Comando por defecto
    CMD ["nginx", "-g", "daemon off;"]
    