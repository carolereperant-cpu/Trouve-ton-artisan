// ============================================================
// App.jsx - Composant racine avec le Router
// Définit toutes les routes de l'application
// ============================================================

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import des composants réutilisables
import Header from './components/Header'
import Footer from './components/Footer'

// Import des pages
import Accueil from './pages/Accueil'
import ListeArtisans from './pages/ListeArtisans'
import FicheArtisan from './pages/FicheArtisan'
import PageLegale from './pages/PageLegale'
import NotFound from './pages/NotFound'

function App() {
  return (
    // BrowserRouter active la navigation sans rechargement de page
    <BrowserRouter>
      {/* Structure globale : Header + Contenu + Footer */}
      <div className="d-flex flex-column min-vh-100">

        {/* Header présent sur toutes les pages */}
        <Header />

        {/* Zone de contenu principal */}
        <main className="flex-grow-1">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<Accueil />} />

            {/* Page liste des artisans par catégorie */}
            {/* :categorie = paramètre dynamique dans l'URL */}
            <Route path="/artisans/:categorie" element={<ListeArtisans />} />

            {/* Page fiche détail d'un artisan */}
            {/* :id = l'identifiant de l'artisan */}
            <Route path="/artisan/:id" element={<FicheArtisan />} />

            {/* Pages légales vides */}
            <Route path="/mentions-legales" element={<PageLegale titre="Mentions légales" />} />
            <Route path="/donnees-personnelles" element={<PageLegale titre="Données personnelles" />} />
            <Route path="/accessibilite" element={<PageLegale titre="Accessibilité" />} />
            <Route path="/cookies" element={<PageLegale titre="Cookies" />} />

            {/* Page 404 - capte toutes les routes inconnues */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer présent sur toutes les pages */}
        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
