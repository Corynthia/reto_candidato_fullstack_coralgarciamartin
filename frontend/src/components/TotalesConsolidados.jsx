// Panel que muestra los totales consolidados en USD (ahorrado, prestado, utilidades).
// Recibe un objeto "totales" con los campos totalCapitalAhorradoUsd,
// totalCapitalPrestadoUsd y totalUtilidadesUsd.
import { formatearMoneda } from '../services/formatUtils';
import '../styles/TotalesConsolidados.css';

const TotalesConsolidados = ({ totales }) => {
  return (
    <div className="totales-consolidados">
      <h2 className="totales-titulo">Totales Consolidados (USD)</h2>
      <div className="totales-grid">
        <div className="total-item capital-ahorrado">
          <span className="total-icon">💰</span>
          <div className="total-info">
            <span className="total-label">Total Capital Ahorrado</span>
            <span className="total-valor">{formatearMoneda(totales.totalCapitalAhorradoUsd)}</span>
          </div>
        </div>

        <div className="total-item capital-prestado">
          <span className="total-icon">🏦</span>
          <div className="total-info">
            <span className="total-label">Total Capital Prestado</span>
            <span className="total-valor">{formatearMoneda(totales.totalCapitalPrestadoUsd)}</span>
          </div>
        </div>

        <div className="total-item utilidades">
          <span className="total-icon">📈</span>
          <div className="total-info">
            <span className="total-label">Total Utilidades</span>
            <span className="total-valor">{formatearMoneda(totales.totalUtilidadesUsd)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalesConsolidados;
