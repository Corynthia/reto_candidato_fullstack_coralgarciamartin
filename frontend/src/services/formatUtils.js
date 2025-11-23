/*
 * formatUtils.js
 *
 * Utilidades para formateo y presentación de valores en la UI:
 * - Formatea números y monedas (USD)
 * - Devuelve símbolos de moneda y emojis de banderas
 *
 * Estas funciones son puramente de presentación y no realizan llamadas
 * a la API ni modifican estado global.
 */
export const formatearMoneda = (valor) => {
  if (!valor && valor !== 0) return '$0.00';
  
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor);
};

export const formatearNumero = (valor) => {
  if (!valor && valor !== 0) return '0';
  
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor);
};

export const obtenerSimboloMoneda = (moneda) => {
  const simbolos = {
    'USD': '$',
    'EUR': '€',
    'PEN': 'S/',
    'NPR': 'रू'
  };
  return simbolos[moneda] || moneda;
};

export const obtenerBandera = (nombrePais) => {
  const banderas = {
    'Ecuador': '🇪🇨',
    'España': '🇪🇸',
    'Perú': '🇵🇪',
    'Nepal': '🇳🇵'
  };
  return banderas[nombrePais] || '';
};
