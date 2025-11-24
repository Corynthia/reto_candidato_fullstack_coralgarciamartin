/* Administracion.jsx — Página CRUD: listar, crear, editar y eliminar registros. */
import { useState, useEffect } from 'react';
import { datosFinancierosAPI } from '../services/api';
import { obtenerBandera, formatearMoneda, obtenerSimboloMoneda } from '../services/formatUtils';
import '../styles/Administracion.css';

// Estado local y control del formulario para la interfaz de administración (CRUD)
const Administracion = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombrePais: '',
    moneda: '',
    capitalAhorradoOriginal: '',
    capitalPrestadoOriginal: '',
    utilidadesOriginal: ''
  });

  // Al montar el componente, cargamos los registros existentes desde la API
  useEffect(() => {
    cargarDatos();
  }, []);

  // Llama al backend para obtener todos los registros y los guarda en estado
  const cargarDatos = async () => {
    try {
      setCargando(true);
      const response = await datosFinancierosAPI.obtenerTodos();
      setDatos(response.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar los datos');
    } finally {
      setCargando(false);
    }
  };

  // Maneja los cambios de cualquier input del formulario.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  // Envío del formulario adaptando el objeto del formulario al formato esperado por el backend.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datosEnviar = {
        nombrePais: formulario.nombrePais,
        moneda: formulario.moneda,
        capitalAhorradoOriginal: parseFloat(formulario.capitalAhorradoOriginal),
        capitalPrestadoOriginal: parseFloat(formulario.capitalPrestadoOriginal),
        utilidadesOriginal: parseFloat(formulario.utilidadesOriginal)
      };

      if (editando) {
        await datosFinancierosAPI.actualizar(editando, datosEnviar);
        alert('Datos actualizados correctamente');
      } else {
        await datosFinancierosAPI.crear(datosEnviar);
        alert('Datos creados correctamente');
      }

      limpiarFormulario();
      cargarDatos();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar los datos');
    }
  };

  // Rellena el formulario con los datos de un registro existente para editarlo.
  const handleEditar = (item) => {
    setEditando(item.id);
    setFormulario({
      nombrePais: item.nombrePais,
      moneda: item.moneda,
      capitalAhorradoOriginal: item.capitalAhorradoOriginal,
      capitalPrestadoOriginal: item.capitalPrestadoOriginal,
      utilidadesOriginal: item.utilidadesOriginal
    });
    setMostrarFormulario(true);
  };

  // Elimina un registro después de pedir confirmación al usuario.
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      try {
        await datosFinancierosAPI.eliminar(id);
        alert('Registro eliminado correctamente');
        cargarDatos();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el registro');
      }
    }
  };

  // Restablece los valores del formulario y vuelve al modo "crear".
  const limpiarFormulario = () => {
    setFormulario({
      nombrePais: '',
      moneda: '',
      capitalAhorradoOriginal: '',
      capitalPrestadoOriginal: '',
      utilidadesOriginal: ''
    });
    setEditando(null);
    setMostrarFormulario(false);
  };

  if (cargando) {
    return <div className="admin-container"><div className="cargando">Cargando...</div></div>;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Gestión de datos financieros por país</p>
      </header>

      <div className="admin-acciones">
        <button 
          className="btn btn-primary"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? '❌ Cancelar' : '➕ Agregar Nuevo País'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="formulario-container">
          <h2>{editando ? 'Editar Datos' : 'Agregar Nuevo País'}</h2>
          <form onSubmit={handleSubmit} className="formulario">
            <div className="form-row">
              <div className="form-group">
                <label>País:</label>
                <input
                  type="text"
                  name="nombrePais"
                  value={formulario.nombrePais}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Colombia"
                />
              </div>
              <div className="form-group">
                <label>Moneda:</label>
                <input
                  type="text"
                  name="moneda"
                  value={formulario.moneda}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: COP"
                  maxLength="10"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Capital Ahorrado:</label>
              <input
                type="number"
                name="capitalAhorradoOriginal"
                value={formulario.capitalAhorradoOriginal}
                onChange={handleInputChange}
                required
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>Capital Prestado:</label>
              <input
                type="number"
                name="capitalPrestadoOriginal"
                value={formulario.capitalPrestadoOriginal}
                onChange={handleInputChange}
                required
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>Utilidades:</label>
              <input
                type="number"
                name="utilidadesOriginal"
                value={formulario.utilidadesOriginal}
                onChange={handleInputChange}
                required
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-acciones">
              <button type="submit" className="btn btn-success">
                {editando ? 'Actualizar' : 'Guardar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tabla-container">
        <h2>Listado de Países</h2>
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>País</th>
              <th>Moneda</th>
              <th>Capital Ahorrado</th>
              <th>Capital Prestado</th>
              <th>Utilidades</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => {
              const bandera = obtenerBandera(item.nombrePais);
              return (
              <tr key={item.id}>
                <td>
                  <span className="pais-cell">
                    {bandera && <span className="pais-bandera">{bandera} </span>}
                    {item.nombrePais}
                  </span>
                </td>
                <td>{item.moneda}</td>
                <td>
                  <div className="valor-cell">
                    <span className="valor-original">
                      {obtenerSimboloMoneda(item.moneda)} {item.capitalAhorradoOriginal?.toLocaleString('es-ES', {minimumFractionDigits: 2})}
                    </span>
                    <span className="valor-usd">{formatearMoneda(item.capitalAhorradoUsd)}</span>
                  </div>
                </td>
                <td>
                  <div className="valor-cell">
                    <span className="valor-original">
                      {obtenerSimboloMoneda(item.moneda)} {item.capitalPrestadoOriginal?.toLocaleString('es-ES', {minimumFractionDigits: 2})}
                    </span>
                    <span className="valor-usd">{formatearMoneda(item.capitalPrestadoUsd)}</span>
                  </div>
                </td>
                <td>
                  <div className="valor-cell">
                    <span className="valor-original">
                      {obtenerSimboloMoneda(item.moneda)} {item.utilidadesOriginal?.toLocaleString('es-ES', {minimumFractionDigits: 2})}
                    </span>
                    <span className="valor-usd">{formatearMoneda(item.utilidadesUsd)}</span>
                  </div>
                </td>
                <td>
                  <div className="acciones-cell">
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleEditar(item)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleEliminar(item.id)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administracion;
