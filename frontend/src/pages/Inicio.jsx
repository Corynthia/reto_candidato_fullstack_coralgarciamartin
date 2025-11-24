/* Inicio.jsx — Página principal: muestra tarjetas por país y totales. */
import { useState, useEffect } from 'react';
import { datosFinancierosAPI } from '../services/api';
import TarjetaPais from '../components/TarjetaPais';
import TotalesConsolidados from '../components/TotalesConsolidados';
import { obtenerBandera } from '../services/formatUtils';
import '../styles/Inicio.css';

// Componente de la página de inicio que muestra datos financieros consolidados devueltos por el backend
const Inicio = () => {
  const [consolidados, setConsolidados] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [paisSeleccionado, setPaisSeleccionado] = useState('todos');

  // Al montar el componente, se hace una única petición para cargar los datos
  useEffect(() => {
    cargarDatos();
  }, []);

  // Manejar estados de carga y error
  const cargarDatos = async () => {
    try {
      setCargando(true);
      const response = await datosFinancierosAPI.obtenerConsolidados();
      setConsolidados(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos financieros');
      console.error('Error:', err);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="inicio-container">
        <div className="cargando">Cargando datos financieros...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="inicio-container">
        <div className="error-mensaje">{error}</div>
      </div>
    );
  }

  if (!consolidados) {
    return null;
  }

  const paisesDisponibles = Array.from(
    new Set(consolidados.datosPorPais.map((datos) => datos.nombrePais))
  );

  const esVistaGlobal = paisSeleccionado === 'todos';

  const datosFiltrados = esVistaGlobal
    ? consolidados.datosPorPais
    : consolidados.datosPorPais.filter(
        (datos) => datos.nombrePais === paisSeleccionado
      );

  const datosPaisSeleccionado = esVistaGlobal
    ? null
    : consolidados.datosPorPais.find(
        (datos) => datos.nombrePais === paisSeleccionado
      );

  const totalesParaMostrar = !datosPaisSeleccionado
    ? consolidados
    : {
        totalCapitalAhorradoUsd: datosPaisSeleccionado.capitalAhorradoUsd,
        totalCapitalPrestadoUsd: datosPaisSeleccionado.capitalPrestadoUsd,
        totalUtilidadesUsd: datosPaisSeleccionado.utilidadesUsd,
      };

  return (
    <div className="inicio-container">
      <header className="inicio-header">
        <h1 className="inicio-titulo">Datos Financieros Globales</h1>
        <p className="inicio-subtitulo">
          Información financiera consolidada de operaciones multinacionales
        </p>
      </header>

      <section className="filtros-consolidados">
        <div className="filtro-pais">
          <label htmlFor="filtro-pais">Ver datos de:</label>
          <select
            id="filtro-pais"
            className="filtro-select"
            value={paisSeleccionado}
            onChange={(e) => setPaisSeleccionado(e.target.value)}
          >
            <option value="todos">Todos los países (vista global)</option>
            {paisesDisponibles.map((pais) => (
              <option key={pais} value={pais}>
                {obtenerBandera(pais)} {pais}
              </option>
            ))}
          </select>
        </div>

        <div className="vista-indicador">
          {esVistaGlobal ? (
            <span>
              Mostrando <strong>totales globales consolidados</strong>
            </span>
          ) : (
            <span>
              Mostrando totales para {obtenerBandera(paisSeleccionado)}{' '}
              <strong>{paisSeleccionado}</strong>
            </span>
          )}
        </div>
      </section>

      <section className="paises-seccion">
        <h2 className="seccion-titulo">
          {esVistaGlobal
            ? 'Datos por País'
            : `Datos para ${obtenerBandera(paisSeleccionado)} ${paisSeleccionado}`}
        </h2>
        <div className={`paises-grid ${esVistaGlobal ? '' : 'paises-grid-detalle'}`}>
          {datosFiltrados.map((datos) => (
            <TarjetaPais key={datos.id} datos={datos} />
          ))}
        </div>
      </section>

      <section className="consolidados-seccion">
        <TotalesConsolidados totales={totalesParaMostrar} />
      </section>

      <footer className="inicio-footer">
        <p>© 2025 Savinco - Reto Coral Garcia</p>
      </footer>
    </div>
  );
};

export default Inicio;
