// ============================================================
// pages/PageLegale.jsx
// Page légale générique (mentions légales, cookies, etc.)
// Ces pages seront remplies plus tard par un cabinet spécialisé
// ============================================================

// Le composant reçoit le titre en prop depuis App.jsx
function PageLegale({ titre }) {
  // Mise à jour du titre de la page pour le SEO
  document.title = `${titre} - Trouve ton artisan`

  return (
    <div className="container section">
      <h1 className="section-title">{titre}</h1>
      <div
        className="alert alert-info"
        role="status"
        style={{ maxWidth: '600px' }}
      >
        <p className="mb-0">
          🚧 <strong>Page en construction</strong> — Cette page sera prochainement
          complétée par notre cabinet spécialisé.
        </p>
      </div>
    </div>
  )
}

export default PageLegale
