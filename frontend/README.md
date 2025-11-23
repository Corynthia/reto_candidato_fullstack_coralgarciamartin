# Frontend - Savinco Financiero

Frontend desarrollado con React y Vite para la visualización y gestión de datos financieros multinacionales.

## Tecnologías

- React 18
- Vite
- React Router DOM
- Axios
- CSS3

## Requisitos previos

- Node.js 16+ y npm

## Instalación y ejecución

1. **Instalar dependencias:**

```bash
npm install
```

2. **Ejecutar en modo desarrollo:**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

3. **Compilar para producción:**

```bash
npm run build
```

## Estructura del proyecto

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TarjetaPais.jsx
│   │   └── TotalesConsolidados.jsx
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   └── Administracion.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── formatUtils.js
│   ├── styles/
│   │   ├── Navbar.css
│   │   ├── TarjetaPais.css
│   │   ├── TotalesConsolidados.css
│   │   ├── Inicio.css
│   │   └── Administracion.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Páginas

### Inicio (Home)
- Página principal con presentación de datos financieros
- Muestra tarjetas por país con datos originales y convertidos a USD
- Totales consolidados en USD
- Diseño responsive y atractivo

### Administración (Dashboard)
- Gestión CRUD de datos financieros
- Tabla con todos los registros
- Formulario para crear y editar países
- Funcionalidad de eliminación con confirmación

## Características

- Interfaz moderna y responsive
- Conversión automática de monedas a USD
- Operaciones CRUD completas
- Manejo de estados de carga y error
- Validación de formularios
- Formato de monedas internacional
- Emojis de banderas por país

## Configuración de API

La URL del backend se configura en `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Scripts disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Vista previa de la compilación
- `npm run lint` - Ejecuta el linter
