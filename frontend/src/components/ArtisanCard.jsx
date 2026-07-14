// ============================================================
// components/ArtisanCard.jsx
// Carte artisan réutilisable
// Utilisée sur la page d'accueil ET la page liste
// ============================================================

import { Link } from 'react-router-dom'

// Fonction utilitaire pour afficher les étoiles
// note = 4.5 → "★★★★½"
function afficherEtoiles(note) {
  const noteArrondie = Math.round(note * 2) / 2 // Arrondi au 0.5 près
  let etoiles = ''
  for (let i = 1; i <= 5; i++) {
    if (i <= noteArrondie) {
      etoiles += '★' // Étoile pleine
    } else if (i - 0.5 === noteArrondie) {
      etoiles += '½' // Demi-étoile
    } else {
      etoiles += '☆' // Étoile vide
    }
  }
  return etoiles
}

// Le composant reçoit les données d'un artisan en "props"
// Props = paramètres passés par le composant parent
function ArtisanCard({ artisan }) {
  return (
    // Link = lien React qui navigue sans recharger la page
    <Link
      to={`/artisan/${artisan.id_artisan}`}
      className="artisan-card"
      aria-label={`Voir la fiche de ${artisan.nom}`}
    >
      <div className="card border-0 h-100 p-3">
        <div className="d-flex align-items-center gap-3 mb-3">

          {/* Photo ou placeholder si pas de photo */}
          {artisan.photo ? (
            <img
              src={artisan.photo}
              alt={`Photo de ${artisan.nom}`}
              className="artisan-card__image"
            />
          ) : (
            <div
              className="artisan-card__image-placeholder"
              aria-hidden="true"
            >
              👷
            </div>
          )}

          {/* Infos principales */}
          <div>
            <h3 className="artisan-card__name mb-1">{artisan.nom}</h3>
            <p className="artisan-card__specialite mb-0">
              {/* On accède à la spécialité via la relation Sequelize */}
              {artisan.Specialite?.nom_specialite}
            </p>
          </div>
        </div>

        {/* Note et localisation */}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {/* Étoiles accessibles avec aria-label */}
            <span
              className="artisan-card__stars"
              aria-label={`Note : ${artisan.note} sur 5`}
            >
              {afficherEtoiles(parseFloat(artisan.note))}
            </span>
            <span className="ms-1 small text-muted">({artisan.note}/5)</span>
          </div>

          <span className="artisan-card__ville">
            📍 {artisan.ville}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ArtisanCard
