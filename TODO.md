## Front

- Que los gramos/gramo de detalle funcionen , por lo tanto cambiar el plurolize, cambiar a verboseGram(number): string, como es un texto, buscamos en las constantes
- Ver el tema de las fechas (desfasadas)
- Que los types/interfaces no esten separados, asi no creamos archivos extras
- Traducir archivos faltantes
- Aumentar la cobertura
- Administrador armar dashbord, pre inventario (sacar los datos de cada inversion,sucursal antes de la distribucion de inventario en un periodo (con un TAB pre y post con periodos)) el pre es antes de olimpo, post inventario es despues de enviarlo, el administrador toma esto y lo distribuye en las salidas, va a cdp, refinacion, exportacion, etc y eso que se va es el post movimiento, hacerlo como en documento, pero hay 3 vistas, en estos tab, pre, post inventario y post movimiento, afuera del tab arriba a la derecha un boton que diga CxC (redirige a la tabla), en la vista del administrador tiene que iniciar lo primero que se ve es el pre inventario, breadcrumb (administrador/ cuentas por cobrar), hacer 3 vistas (simulando el tab(es un link, son 3 paginas distintas))
- en CxC un filtro del responsable y hacer un listado con las sucursales
- en CxC tiene que tener un responsable o no deja pasar
# Nuevos servicios

- GET /api/v1/packinglist Listado paginado de los PackingList
- GET /api/v1/packinglist/{id} Llama por Id a un PackingList
- GET /api/v1/packinglist/{id}/transfers Llama a todos los traslados que pertenecen a un PackingList
- GET /api/v1/transfers/{id} Llama el detalle de un traslado

## Backend

# Eliminar

- GET
  /api/v1/contracts
  Listar contratos (paginado)
- GET
  /api/v1/contracts/all
  Listar todos los contratos (sin paginar)
- GET
  /api/v1/inventory-types/by-name/{name}
- GET
  /api/v1/inventory-types/search
  Search inventory types
- GET
  /api/v1/inventory-types/{id}
  Retrieve inventory type by ID
- POST
  /api/v1/notifications/test/system-alert
  Enviar notificación de prueba - Alerta del Sistema
- POST
  /api/v1/notifications/test/resolution
  Enviar notificación de prueba - Nueva Resolución
- POST
  /api/v1/notifications/test/receivable
  Enviar notificación de prueba - Nuevo Recibo
- GET
  /api/v1/packinglistreport/{id}
  Get full packing list by ID
- GET
  /api/v1/packinglist/{id}/metadata
  Get packing list metadata
- PATCH
  /api/v1/packinglist/{id}/metadata
  Create/Update packing list metadata (upsert)
- GET
  /api/v1/resolutions/{resolutionId}/inventory/type/{inventoryTypeId}
  Obtener inventario por tipo
- GET
  /api/v1/resolutions/{resolutionId}/inventory/{inventoryId}
  Obtener inventario específico
- DELETE
  /api/v1/resolutions/{resolutionId}/inventory/{inventoryId}
  Eliminar inventario específico
- POST
  /api/v1/test/notifications/system-alert
  Test - Enviar alerta del sistema
- POST
  /api/v1/test/notifications/resolution
  Test - Enviar notificación Nueva Resolución
- POST
  /api/v1/test/notifications/receivable
  Test - Enviar notificación Nuevo Recibo
