// Barra de navegación superior con enlaces a las páginas principales.
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  // Hook de React Router para conocer la ruta actual y marcar el enlace activo
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logotipo / nombre de la aplicación que enlaza a la página de inicio */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">App Financiera</span>
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/administracion" 
              className={`navbar-link ${location.pathname === '/administracion' ? 'active' : ''}`}
            >
              Administración
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
