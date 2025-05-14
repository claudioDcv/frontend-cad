#!/bin/bash

# Configuración
PORTAINER_HOST="172.16.22.240"
PORTAINER_PORT="9000"
PORTAINER_USER="usradmin"
PORTAINER_PASS="adminkey.2025"
IMAGE_NAME="cad-ui/frontend:v1"
TAR_FILE="cad-ui.tar"
CONTAINER_NAME="cad-ui-container"
APP_PORT="8182"

# 1. Build de frontend (Vite)
echo "🧪 Ejecutando npm install y npm run build..."
npm install
if [ $? -ne 0 ]; then echo "❌ Falló npm install."; exit 1; fi

npm run build
if [ $? -ne 0 ]; then echo "❌ Falló npm run build."; exit 1; fi

# 2. Build de imagen Docker con plataforma especificada
echo "🛠️  Construyendo imagen Docker..."
docker build --platform linux/amd64 -t $IMAGE_NAME .
if [ $? -ne 0 ]; then echo "❌ Falló el build Docker."; exit 1; fi

# 3. Guardar imagen como .tar
echo "📦  Guardando imagen como $TAR_FILE..."
docker save $IMAGE_NAME -o $TAR_FILE
if [ $? -ne 0 ]; then echo "❌ Falló el guardado."; exit 1; fi

# 4. Obtener token de Portainer
echo "🔐  Autenticando con Portainer..."
TOKEN=$(curl -s -X POST "http://$PORTAINER_HOST:$PORTAINER_PORT/api/auth" \
  -H "Content-Type: application/json" \
  -d "{\"Username\":\"$PORTAINER_USER\",\"Password\":\"$PORTAINER_PASS\"}" \
  | grep -o '"jwt":"[^"]*"' | cut -d':' -f2 | tr -d '"')

if [ -z "$TOKEN" ]; then
  echo "❌ No se pudo obtener token. Verifica usuario/contraseña."
  exit 1
fi

# 5. Obtener endpointId
echo "🔍 Obteniendo endpoint ID..."
ENDPOINT_ID=$(curl -s -H "Authorization: Bearer $TOKEN" \
  "http://$PORTAINER_HOST:$PORTAINER_PORT/api/endpoints" | grep -o '"Id":[0-9]*' | head -n 1 | cut -d':' -f2)

if [ -z "$ENDPOINT_ID" ]; then
  echo "❌ No se encontró endpoint válido."
  exit 1
fi

echo "➡️  Usando endpoint ID: $ENDPOINT_ID"

# 6. Subir imagen
echo "⬆️  Subiendo imagen a Portainer..."
curl -s -X POST "http://$PORTAINER_HOST:$PORTAINER_PORT/api/endpoints/$ENDPOINT_ID/docker/images/load" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/x-tar" \
  --data-binary "@$TAR_FILE"

# 7. Eliminar contenedor viejo
echo "🧹  Eliminando contenedor anterior (si existe)..."
curl -s -X DELETE "http://$PORTAINER_HOST:$PORTAINER_PORT/api/endpoints/$ENDPOINT_ID/docker/containers/$CONTAINER_NAME?force=true" \
  -H "Authorization: Bearer $TOKEN"

# 8. Crear nuevo contenedor
echo "🚀  Creando nuevo contenedor..."
curl -s -X POST "http://$PORTAINER_HOST:$PORTAINER_PORT/api/endpoints/$ENDPOINT_ID/docker/containers/create?name=$CONTAINER_NAME" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
        \"Image\": \"$IMAGE_NAME\",
        \"ExposedPorts\": {
          \"80/tcp\": {}
        },
        \"HostConfig\": {
          \"PortBindings\": {
            \"80/tcp\": [{\"HostPort\": \"$APP_PORT\"}]
          }
        }
      }"

# 9. Iniciar contenedor
echo "🟢  Iniciando contenedor..."
curl -s -X POST "http://$PORTAINER_HOST:$PORTAINER_PORT/api/endpoints/$ENDPOINT_ID/docker/containers/$CONTAINER_NAME/start" \
  -H "Authorization: Bearer $TOKEN"

echo "✅ ¡Deploy completado! Interfaz disponible en: http://$PORTAINER_HOST:$APP_PORT"