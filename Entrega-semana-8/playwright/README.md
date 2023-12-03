# Running only end-to-end tests

1. Ir a la carpeta Playwright.
2. Abrir el archivo .env en un manejador de texto de su preferencia. Debe poder ver los siguientes parámetros:

* IS_REFERENCE_OR_TEST=REFERENCE #no tocar
* USERNAMEGHOST=escribasuemail@test.com #ejemplo test@gmail.com
* PASSWORD=0123456789
* REFERENCE_IMAGES=./VTK/reference_screenshots/ #no tocar 
* REFERENCE_URL=http://localhost:2369 # Debe colocar la url de la versión de ghost (5.69.0).
* REFERENCE_VERSION='5.69.0' #no tocar
* TESTS_IMAGES=./VTK/test_screenshots/ #no tocar
* TESTS_URL=http://localhost:3003 # Debe colocar la url de la versión de ghost (4.48.9).
* TEST_VERSION='4.48.9' #no tocar
* ACTIVE_VERSION='5.69.0' #no tocar

**SOLO DEBE AGREGAR SU USERNAME (AKA USERNAMEGHOST), PASSWORD, REFERENCE_URL (SU URL DE GHOST LOCAL) **
3. Para correr solo las pruebas e2e, puede ejecutar los siguiente comandos: yarn test, npm run test
 
# Running Playwright y Resemble.

## Configurar Playwright para Ghost version 5.69.0 y 4.48.9.

1. Ir a la carpeta Playwright.
2. Abrir el archivo .env en un manejador de texto de su preferencia. Debe poder ver los siguientes parámetros:

* IS_REFERENCE_OR_TEST=REFERENCE #no tocar
* USERNAMEGHOST=escribasuemail@test.com #ejemplo test@gmail.com
* PASSWORD=0123456789
* REFERENCE_IMAGES=./VTK/reference_screenshots/ #no tocar 
* REFERENCE_URL=http://localhost:2369 # Debe colocar la url de la versión de ghost (5.69.0).
* REFERENCE_VERSION='5.69.0' #no tocar
* TESTS_IMAGES=./VTK/test_screenshots/ #no tocar
* TESTS_URL=http://localhost:3003 # Debe colocar la url de la versión de ghost (4.48.9).
* TEST_VERSION='4.48.9' #no tocar
* ACTIVE_VERSION='5.69.0' #no tocar

**SOLO DEBE AGREGAR SU USERNAME (AKA USERNAMEGHOST), PASSWORD, REFERENCE_URL, TESTS_URL**

3. Instalar las dependencias. Puede ejecutar los siguientes comandos: npm i, yarn install, npx i. En caso de recibir algun mensaje de error solicitando la libreria playwright, ejecutar npm i playwright, yarn install playwright.


## Ejecución de las pruebas
Existen varias formas para ejecutar las pruebas e2e de Playwright.

1. Correr todas las pruebas e2e para ambas versiones de Ghost: 
   * npm run test:all:win (USUARIOS WINDOWS), npm run test:all(USUARIOS MAC)

2. Correr las pruebas para la app de referencia (5.69.0)
   * npm run test:reference:win (USUARIOS WINDOWS) y npm run test:reference:win (USUARIOS MAC)

3. Correr las pruebas para la app de prueba (4.48.9)
   * npm run test:tests:win(USUARIOS WINDOWS) y npm run test:tests (USUARIOS MAC)

4. Limpiar las imagenes generadas en cada paso de las pruebas.
   * npm run clean:images:win(USUARIOS WINDOWS) y npm run clean:images (USUARIOS MAC)

En la carpeta VTK en el directorio raiz, se almacenan las imagenes generadas en cada paso de las pruebas. Adentro encontrará dos carpetas:
   *  reference_screenshots (imagenes de la app de referencia), test_screenshots (imagenes de la app en prueba).


## Ejecución de resemble para pruebas de regresión visual con Resemble.js (VRT)
   * La lógica para comparar imágenes la puede encontrar en la carpeta resemble/index.js.
   * Después de generar las imágenes, para ejecutar las pruebas VRT debes ejecutar los siguientes comandos:
     npm run resemble:images:win(USUARIOS WINDOWS) y npm run resemble(USUARIOS MAC).

LA CANTIDAD DE IMAGENES GENERADAS PARA LA APP DE REFERENCIA DEBE SER LA MISMA QUE PARA LA APP DE PRUEBA. RESEMBLE NO DEJA HACER PRUEBAS SOBRE CONJUNTO DE IMAGENES DE DIFERENTES CANTIDADES. EN CASO DE QUERE HACER DICHA VALIDACION, PUEDE IR A resemble/index.js Y ELIMINAR LAS LINEAS DE CÓDIGO QUE VALIDA ESA CONDICIÓN.

   * En la carpeta results debe encontrar un archivo html llamado report.html. Este es el reporte generado por resemble de forma automática. Debe hacer uso de un navegador web para poder visualizarlo.  

   EL CÓDIGO PARA LA GENERACIÓN AUTOMÁTICA DEL REPORTE CON RESEMBLE SE PUEDE ENCONTRAR EN RESEMBLE/INDEX.JS Y EN EL ARCHIVO HELPERS -> REPORTS.JS

EN LA CARPETA RAIZ DEL PROYECTO, PODRÁ ENCONTRAR UN REPORTE DE EJEMPLO USANDO RESEMBLE (sample-report.html). PUEDE ABRIRLO COMO PRUEBA EN CASO DE PRESENTAR PROBLEMAS DURANTE LA EJECUCION DE PRUEBAS.
