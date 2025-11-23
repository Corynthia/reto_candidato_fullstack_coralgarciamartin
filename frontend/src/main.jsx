// Punto de entrada principal de la aplicación React.
// Aquí montamos el componente raíz <App /> dentro del elemento con id "root".
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
