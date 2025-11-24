# Savinco - Sistema de Gestión Financiera Global

Aplicación fullstack para la gestión y visualización de datos financieros multinacionales, con conversión automática de divisas a dólares estadounidenses (USD) para su análisis y consolidación.

## Índice

1. [Descripción general](#descripción-general)
2. [Arquitectura del proyecto](#arquitectura-del-proyecto)
3. [Tecnologías y versiones](#tecnologías-y-versiones)
4. [Puesta en marcha](#puesta-en-marcha)
   - [Requisitos previos](#requisitos-previos)
   - [Configuración de la base de datos](#configuración-de-la-base-de-datos)
   - [Backend](#backend)
   - [Frontend](#frontend)
5. [Modelo de datos y conversión de monedas](#modelo-de-datos-y-conversión-de-monedas)
6. [API REST principal](#api-rest-principal)
7. [Uso de la aplicación](#uso-de-la-aplicación)
8. [Verificación y pruebas](#verificación-y-pruebas)
9. [Estructura de carpetas](#estructura-de-carpetas)
10. [Autor y licencia](#autor-y-licencia)

## Descripción general

El sistema permite:

- Registrar y consultar información financiera de varios países, cada uno con su propia moneda.
- Convertir automáticamente todos los importes a USD utilizando tipos de cambio definidos en base de datos.
- Visualizar tanto los valores originales como los valores en USD, por país y de forma consolidada.
- Gestionar los datos mediante operaciones completas de alta, edición y eliminación.

Actualmente se incluyen cuatro países de ejemplo: Ecuador, España, Perú y Nepal.

## Arquitectura del proyecto

Proyecto fullstack dividido en dos módulos principales:

```text
reto_candidato_fullstack_coralgarcia/
├── backend/                    # API REST con Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/savinco/financiero/
│   │   │   │   ├── modelo/              # Entidades JPA
│   │   │   │   ├── repositorio/         # Repositorios Spring Data
│   │   │   │   ├── servicio/            # Lógica de negocio y conversión de moneda
│   │   │   │   ├── controlador/         # Controladores REST
│   │   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   │   └── config/              # Configuración (CORS, etc.)
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── schema.sql           # Script SQL de creación e inserción de datos
│   │   └── test/
│   └── pom.xml
│
└── frontend/                   # SPA con React y Vite
    ├── src/
    │   ├── components/         # Componentes reutilizables (tarjetas, totales, etc.)
    │   ├── pages/              # Páginas principales (Inicio, Administración)
    │   ├── services/           # Cliente HTTP y utilidades de formato
    │   └── styles/             # Estilos CSS
    ├── package.json
    └── vite.config.js
```

## Tecnologías y versiones

### Backend

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL 8.0
- Maven 3.6 o superior
- Lombok

### Frontend

- React 18
- Vite
- React Router DOM
- Axios
- CSS3

### Base de datos

- MySQL 8.0

## Puesta en marcha

### Requisitos previos

- JDK 17 o superior
- Maven 3.6+ (para el backend)
- Node.js 16+ y npm (para el frontend)
- MySQL 8.0+ en ejecución

Se asume que el backend se ejecutará en `http://localhost:8080` y el frontend en `http://localhost:5173`.

### Configuración de la base de datos

1. Crear la base de datos y las tablas ejecutando el script incluido:

```bash
mysql -u root -p < backend/src/main/resources/schema.sql
```

2. Como alternativa, crear primero la base vacía y después ejecutar el script:

```sql
CREATE DATABASE savinco_db;
```

El archivo `schema.sql` crea la base de datos `savinco_db`, las tablas `exchange_rates` y `country_financial_data`, e inserta tanto las tasas de cambio como los datos iniciales de los cuatro países.

### Backend

1. Acceder al módulo:

```bash
cd backend
```

2. Configurar las credenciales de acceso a MySQL en `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/savinco_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD
```

3. Compilar y ejecutar el backend:

```bash
mvn clean install
mvn spring-boot:run
```

La API REST quedará disponible en `http://localhost:8080`.

### Frontend

1. Acceder al módulo:

```bash
cd frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:\r

```bash
npm run dev
```

La aplicación web quedará disponible en `http://localhost:5173`.

## Modelo de datos y conversión de monedas

### Tablas principales

Tabla `country_financial_data` (datos financieros por país):

```sql
CREATE TABLE country_financial_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(50) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    capital_ahorrado_original DECIMAL(18,2) NOT NULL,
    capital_prestado_original DECIMAL(18,2) NOT NULL,
    utilidades_original DECIMAL(18,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Tabla `exchange_rates` (tipos de cambio frente al USD):

```sql
CREATE TABLE exchange_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currency VARCHAR(10) NOT NULL UNIQUE,
    usd_to_currency_rate DECIMAL(18,6) NOT NULL
);
```

### Tipos de cambio utilizados

| Moneda            | Código | Tasa (1 USD = X) |
|-------------------|--------|------------------|
| Dólar estadounidense | USD    | 1.00             |
| Euro              | EUR    | 0.90             |
| Sol peruano       | PEN    | 3.30             |
| Rupia nepalí      | NPR    | 133.00           |

La conversión de moneda se realiza en el backend mediante la fórmula:

```text
monto_usd = monto_original / tasa_cambio
```

Los valores originales se almacenan en la moneda local de cada país y se convierten a USD en tiempo de ejecución para construir los DTOs que consume el frontend.

### Distribución de totales por país

Los totales consolidados en USD se reparten entre los cuatro países de la siguiente forma:

| País   | Porcentaje | Capital ahorrado (USD) | Capital prestado (USD) | Utilidades (USD) |
|--------|------------|------------------------|------------------------|------------------|
| Ecuador | 40 % | 13.466.590,80 | 109.951.236,40 | 15.832.564,40 |
| España  | 30 % | 10.099.943,10 | 82.463.427,30  | 11.874.423,30 |
| Perú    | 20 % | 6.733.295,40  | 54.975.618,20  | 7.916.282,20  |
| Nepal   | 10 % | 3.366.647,70  | 27.487.809,10  | 3.958.141,10  |
| **Total** | **100 %** | **33.666.477,00** | **274.878.091,00** | **39.581.411,00** |

En la base de datos estos importes se almacenan en la moneda local de cada país, de acuerdo con los tipos de cambio anteriores:

- Ecuador: USD (se almacenan directamente los valores en USD).
- España: EUR (los valores en EUR equivalen a los USD objetivo multiplicados por 0,90).
- Perú: PEN (los valores en PEN equivalen a los USD objetivo multiplicados por 3,30).
- Nepal: NPR (los valores en NPR equivalen a los USD objetivo multiplicados por 133,00).

### Fórmulas de conversión

Conversión de moneda local a USD:

```text
monto_usd = monto_original / tasa_cambio
```

Conversión de USD a moneda local (utilizada para calcular los valores que se insertan en la base de datos a partir de los totales en USD):

```text
monto_local = monto_usd × tasa_cambio
```

Estos cálculos se han ajustado para que los totales consolidados coincidan exactamente con los valores definidos en el anexo del reto.

## API REST principal

Los endpoints expuestos por el backend son:

| Método | Endpoint                             | Descripción                              |
|--------|--------------------------------------|------------------------------------------|
| GET    | `/api/datos-financieros`            | Obtiene todos los datos por país         |
| GET    | `/api/datos-financieros/{id}`       | Obtiene los datos de un país por ID      |
| GET    | `/api/datos-financieros/consolidados` | Obtiene los totales consolidados en USD |
| POST   | `/api/datos-financieros`            | Crea un nuevo registro de país           |
| PUT    | `/api/datos-financieros/{id}`       | Actualiza un registro existente          |
| DELETE | `/api/datos-financieros/{id}`       | Elimina un registro                      |

El formato de los cuerpos de las peticiones POST y PUT está documentado en las clases DTO del backend y en el código del frontend.

## Uso de la aplicación

### Página de inicio (vista global e individual)

- Muestra una tarjeta por cada país con sus importes en moneda original y en USD.
- Permite filtrar la vista para mostrar todos los países o centrarse en un país concreto.
- Presenta un panel de totales consolidados en USD (capital ahorrado, capital prestado y utilidades).

### Página de administración

- Lista todos los registros almacenados en la base de datos.
- Permite crear un nuevo país con sus importes originales.
- Permite editar y eliminar registros existentes, con confirmación en las operaciones destructivas.
- Muestra simultáneamente los valores originales y los valores convertidos a USD para cada fila.

## Verificación y pruebas

Para comprobar que la instalación es correcta y que los totales coinciden con los valores esperados, se recomienda seguir los pasos siguientes.

### Checklist rápida

**Base de datos**

- MySQL en ejecución.
- Base de datos `savinco_db` creada.
- Tablas `country_financial_data` y `exchange_rates` presentes.
- Existen 4 registros de países y 4 tipos de cambio.

Consultas de apoyo:

```sql
USE savinco_db;

SELECT country_name, currency FROM country_financial_data;
SELECT currency, usd_to_currency_rate FROM exchange_rates;
```

**Backend (Spring Boot)**

- Java 17 y Maven instalados.
- Dependencias compiladas correctamente (`mvn clean install`).
- Aplicación en ejecución en `http://localhost:8080`.

Pruebas rápidas con curl o navegador:

```bash
curl http://localhost:8080/api/datos-financieros
curl http://localhost:8080/api/datos-financieros/consolidados
```

**Frontend (React)**

- Node.js y npm instalados.
- Dependencias instaladas (`npm install`).
- Aplicación en ejecución en `http://localhost:5173`.

Al acceder al frontend deben mostrarse:

- Cuatro tarjetas de países en la página de inicio.
- El panel de totales consolidados.
- La página de administración accesible desde el menú.

### Totales esperados

| Concepto             | Total en USD      |
|----------------------|-------------------|
| Capital ahorrado     | 33.666.477,00 USD |
| Capital prestado     | 274.878.091,00 USD|
| Utilidades generadas | 39.581.411,00 USD |

### Problemas frecuentes (resumen)

- **El backend no arranca**: comprobar que MySQL está activo, que las credenciales en `application.properties` son correctas y que el puerto 8080 está libre.
- **El frontend muestra error de red**: asegurarse de que el backend está levantado y accesible desde `http://localhost:8080` y revisar la consola del navegador.
- **Los totales no coinciden**: revisar que el script `schema.sql` se ha ejecutado sin errores y que las tasas de cambio en `exchange_rates` son exactamente las indicadas en este documento.

### Tests automatizados

- Backend:

  ```bash
  cd backend
  mvn test
  ```

- Frontend (lint):

  ```bash
  cd frontend
  npm run lint
  ```

### Construcción para producción

- Backend:

  ```bash
  cd backend
  mvn clean package
  # El JAR resultante se encontrará en target/
  ```

- Frontend:

  ```bash
  cd frontend
  npm run build
  # Los archivos estáticos se generarán en dist/
  ```

## Estructura de carpetas

La estructura resumida del repositorio es la siguiente:

```text
reto_candidato_fullstack_coralgarcia/
├── backend/
│   ├── src/main/java/com/savinco/financiero/...
│   ├── src/main/resources/application.properties
│   ├── src/main/resources/schema.sql
│   └── pom.xml
├── frontend/
│   ├── src/components
│   ├── src/pages
│   ├── src/services
│   ├── src/styles
│   └── package.json
├── CALCULOS_CONVERSIONES.md
├── RESUMEN_TOTALES.md
└── VERIFICACION.md
```

## Autor y licencia

Este proyecto ha sido desarrollado por **Coral García** como parte de un reto técnico para Savinco.

El código se entrega con fines de evaluación técnica y puede ser reutilizado o extendido según las necesidades del equipo técnico que lo revise.
**¡Gracias por revisar este proyecto!**
