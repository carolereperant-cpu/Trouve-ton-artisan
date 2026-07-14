// ============================================================
// main.jsx - Point d'entrée de l'application React
// C'est le premier fichier exécuté par Vite
// ============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import de nos styles globaux (Sass + Bootstrap)
import './styles/main.scss'

// Import du composant racine
import App from './App.jsx'

// On "monte" l'application React dans le div#root de index.html
// StrictMode active des avertissements supplémentaires en développement
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
