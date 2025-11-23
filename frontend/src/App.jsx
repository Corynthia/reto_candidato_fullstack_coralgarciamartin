/* App.jsx — Componente raíz: configura rutas y layout (Navbar + contenido). */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Administracion from './pages/Administracion';
import './App.css';

function App() {
  return (
    // Router envuelve toda la aplicación para habilitar la navegación por rutas
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/administracion" element={<Administracion />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
