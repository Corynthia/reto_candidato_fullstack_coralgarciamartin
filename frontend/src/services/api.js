/*
 * api.js
 *
 * Cliente HTTP central (Axios) para comunicar el frontend con el backend.
 * Exporta una instancia configurada y métodos específicos para el recurso
 * `datos-financieros` (obtener, crear, actualizar, eliminar, etc.).
 *
 * Uso: los componentes o páginas llaman a `datosFinancierosAPI.*` y reciben
 * promesas con las respuestas del servidor (JSON). No modifica estado global;
 * sólo facilita las llamadas HTTP.
 */
import axios from 'axios';

// URL base de todos los endpoints del backend
const API_BASE_URL = 'http://localhost:8080/api';

// Instancia reutilizable de Axios con configuración común
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Métodos específicos para trabajar con el recurso "datos-financieros"
export const datosFinancierosAPI = {
  obtenerTodos: () => api.get('/datos-financieros'),
  obtenerPorId: (id) => api.get(`/datos-financieros/${id}`),
  obtenerConsolidados: () => api.get('/datos-financieros/consolidados'),

  crear: (datos) => api.post('/datos-financieros', datos),
  actualizar: (id, datos) => api.put(`/datos-financieros/${id}`, datos),
  eliminar: (id) => api.delete(`/datos-financieros/${id}`),
};

export default api;
