# Backend - Savinco Financiero

Backend desarrollado con Spring Boot 3 para la gestión de datos financieros multinacionales.

## Tecnologías

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL 8
- Maven
- Lombok

## Requisitos previos

- JDK 17 o superior
- Maven 3.6+
- MySQL 8.0+

## Configuración

1. **Crear base de datos MySQL:**

```bash
mysql -u root -p < src/main/resources/schema.sql
```

O crear manualmente:
```sql
CREATE DATABASE savinco_db;
```

2. **Configurar credenciales de MySQL** en `src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=tu_password
```

3. **Compilar el proyecto:**

```bash
mvn clean install
```

4. **Ejecutar la aplicación:**

```bash
mvn spring-boot:run
```

La aplicación estará disponible en `http://localhost:8080`

## Endpoints de la API

### Obtener todos los datos financieros
```
GET /api/datos-financieros
```

### Obtener datos por ID
```
GET /api/datos-financieros/{id}
```

### Obtener totales consolidados
```
GET /api/datos-financieros/consolidados
```

### Crear datos financieros
```
POST /api/datos-financieros
Content-Type: application/json

{
  "nombrePais": "Colombia",
  "moneda": "COP",
  "capitalAhorradoOriginal": 1000000,
  "capitalPrestadoOriginal": 5000000,
  "utilidadesOriginal": 500000
}
```

### Actualizar datos financieros
```
PUT /api/datos-financieros/{id}
Content-Type: application/json

{
  "nombrePais": "Colombia",
  "moneda": "COP",
  "capitalAhorradoOriginal": 1200000,
  "capitalPrestadoOriginal": 5500000,
  "utilidadesOriginal": 600000
}
```

### Eliminar datos financieros
```
DELETE /api/datos-financieros/{id}
```

## Estructura del proyecto

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/savinco/financiero/
│   │   │   ├── FinancieroApplication.java
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.java
│   │   │   ├── controlador/
│   │   │   │   └── DatosFinancierosControlador.java
│   │   │   ├── dto/
│   │   │   │   ├── CrearDatosFinancierosDTO.java
│   │   │   │   ├── DatosFinancierosDTO.java
│   │   │   │   └── TotalesConsolidadosDTO.java
│   │   │   ├── modelo/
│   │   │   │   ├── DatosFinancierosPais.java
│   │   │   │   └── TipoCambio.java
│   │   │   ├── repositorio/
│   │   │   │   ├── DatosFinancierosPaisRepositorio.java
│   │   │   │   └── TipoCambioRepositorio.java
│   │   │   └── servicio/
│   │   │       ├── ConversionMonedaServicio.java
│   │   │       └── DatosFinancierosServicio.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── schema.sql
│   └── test/
└── pom.xml
```

## Conversión de monedas

El sistema convierte automáticamente todas las monedas a USD usando las siguientes tasas:

- 1 USD = 0.90 EUR
- 1 USD = 3.3 PEN
- 1 USD = 133 NPR

Fórmula: `monto_usd = monto_original / tasa_usd_a_moneda`

## Totales Esperados

Cuando ejecutes el endpoint `/api/datos-financieros/consolidados`, deberías obtener estos totales:

- **Total Capital Ahorrado:** $33,666,477.00
- **Total Capital Prestado:** $274,878,091.00  
- **Total Utilidades:** $39,581,411.00

Distribución por país: Ecuador 40%, España 30%, Perú 20%, Nepal 10%
