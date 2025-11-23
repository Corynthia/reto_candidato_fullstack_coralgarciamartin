// Tarjeta que muestra la información financiera de un país concreto.
// Recibe un objeto "datos" con los importes originales y en USD.
import { formatearMoneda, obtenerSimboloMoneda, obtenerBandera } from '../services/formatUtils';
import '../styles/TarjetaPais.css';

const TarjetaPais = ({ datos }) => {
  return (
    <div className="tarjeta-pais">
      <div className="tarjeta-header">
        {/* Bandera asociada al país, si está definida en formatUtils */}
        <span className="bandera">{obtenerBandera(datos.nombrePais)}</span>
        {/* Nombre del país */}
        <h3 className="nombre-pais">{datos.nombrePais}</h3>
        {/* Código de moneda del país */}
        <span className="moneda-badge">{datos.moneda}</span>
      </div>
      
      <div className="tarjeta-contenido">
        {/* Bloque: capital ahorrado (moneda original + USD) */}
        <div className="dato-financiero">
          <span className="dato-label">Capital Ahorrado</span>
          <span className="dato-original">
            {/* Valor original, con símbolo de moneda y formato local */}
            {obtenerSimboloMoneda(datos.moneda)} {datos.capitalAhorradoOriginal?.toLocaleString('es-ES', {minimumFractionDigits: 2})}
          </span>
          {/* Valor convertido a USD, usando la utilidad de formato */}
          <span className="dato-usd">{formatearMoneda(datos.capitalAhorradoUsd)}</span>
        </div>

        <div className="dato-financiero">
          <span className="dato-label">Capital Prestado</span>
          <span className="dato-original">
            {obtenerSimboloMoneda(datos.moneda)} {datos.capitalPrestadoOriginal?.toLocaleString('es-ES', {minimumFractionDigits: 2})}
          </span>
          <span className="dato-usd">{formatearMoneda(datos.capitalPrestadoUsd)}</span>
        </div>

        <div className="dato-financiero">
          <span className="dato-label">Utilidades</span>
          <span className="dato-original">
            {obtenerSimboloMoneda(datos.moneda)} {datos.utilidadesOriginal?.toLocaleString('es-ES', {minimumFractionDigits: 2})}
          </span>
          <span className="dato-usd">{formatearMoneda(datos.utilidadesUsd)}</span>
        </div>
      </div>
    </div>
  );
};

export default TarjetaPais;
