// ============================================================
// pages/NotFound.jsx
// Page 404 - affichée quand une URL n'existe pas
// React Router la déclenche avec la route path="*" dans App.jsx
// ============================================================

import { Link } from 'react-router-dom'

function NotFound() {
  // Mise à jour du titre de la page
  document.title = 'Page introuvable - Trouve ton artisan'

  return (
    <div className="not-found">
      <div className="container text-center">

        {/* Grand code 404 visuel */}
        <div className="not-found__code" aria-hidden="true">404</div>

        <h1 className="h2 mt-3 mb-3">Page introuvable</h1>

        <p className="text-muted mb-4" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
          La page que vous avez demandée n'existe pas ou a été déplacée.
          Utilisez le menu pour naviguer sur le site.
        </p>

        {/* Illustration */}
        <div style={{ fontSize: '5rem', marginBottom: '2rem' }} aria-hidden="true">
          🔧
        </div>

        {/* Liens de retour */}
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/" className="btn btn-primary btn-lg">
            Retour à l'accueil
          </Link>
          <Link to="/artisans/Bâtiment" className="btn btn-outline-primary btn-lg">
            Voir les artisans
          </Link>
        </div>

      </div>
    </div>
  )
}

export default NotFound
