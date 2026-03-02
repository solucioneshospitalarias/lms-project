import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Importamos esto
import App from './App'
import './styles/variables.css' // Tus variables globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Envolvemos la App aquí */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)