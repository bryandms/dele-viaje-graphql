<h4 align="center">
  <img src="logo-es.png" alt="Dele Viaje Logo" />
</h4>

<div align="center">

[¿Por qué con Graphql?](#por-qué-con-graphql) | [Instalación](#instalación) | [Contribuir](#contribuir) | [Licencia](#licencia)

[:es:](README-ES.md) | [:us:](README.md)

[![license][img-license-badge]][MIT]

</div>

Dele Viaje es un API Graphql para recomendar sitios turísticos según los criterios de búsqueda del usuario utilizando el algoritmo de distancia euclidiana.

### ¿Por qué con Graphql?
Dele Viaje fue creado para ayudar a cualquier persona a encontrar sitios turísticos, por esta razón, cualquiera podría usar la API para crear nuevas aplicaciones, pero tal vez no todas las personas quieran consultar toda la información disponible sobre un sitio turístico, tal vez solo quieran saber el nombre, la ubicación y el horario, o tal vez el nombre y los servicios, es en este punto donde Graphql viene a ayudarnos, porque gracias a Graphql podemos definir los datos que queremos conocer acerca de los sitios turísticos.

Graphql permite tener un único endpoint donde se solicita la información de los múltiples recursos y campos, indicando solo lo que necesitamos. No más overfetching y underfetching.

## Instalación
Paso 1: Clone o descargue el repositorio.

Paso 2: Cambie al directorio de su repositorio.
```
cd /ruta/de/su/repo
```

Paso 3: Instale las dependencias.
```
npm install
```

Paso 4:  Duplique el archivo .env-example y cambie el nombre a .env y cambie las variables de entorno.
```
cp .env-example .env
```

Paso 5: Inicie su servidor.
```
npm start
```

Paso 6: Ejecute las pruebas.
```
npm test
```

## Contribuir
Si encuentra un bug, algo por mejorar, desea agregar una nueva funcionalidad, cree el issue en GitHub o si desea crear un PR, créelo. De esta manera ayudamos a las demás personas que usen Dele Viaje.

### Licencia
Ver [licencia](LICENSE)

[img-license-badge]:https://img.shields.io/github/license/bryandms/dele-viaje-graphql.svg?label=LICENSE&style=for-the-badge
[MIT]:https://opensource.org/licenses/MIT
