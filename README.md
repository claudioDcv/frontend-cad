# CAD

Esta es la base para un Microfront con React integrado a ***Olimpo Web***


http://172.16.22.240:8086/login


————————————————————————————————
DOCKER
————————————————————————————————

1 - docker load -i olimpo-test-arm64.tar
2 - docker images
3 - docker run -p 8180:8180 --name olimpo-test-container olimpo-test
4 -  docker ps


http://localhost:8180/cad#/?role=GERENTE%20ZONAL

/resolutions/<id>/reset
Elimina todo lo relacionado con esa resolucion, CxC, distribucion de inventario, metadata,
Este endpoint es para poder hacer pruebas con esa resolucion.

Lo mismo aplica a PL