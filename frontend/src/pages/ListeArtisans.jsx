// ============================================================
// pages/ListeArtisans.jsx
// Page liste des artisans selon la catégorie ou la recherche
// ============================================================

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ArtisanCard from '../components/ArtisanCard'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

function ListeArtisans() {
  // useParams récupère les paramètres dynamiques de l'URL
  // Ex: /artisans/Bâtiment → { categorie: 'Bâtiment' }
  const { categorie } = useParams()

  // useSearchParams récupère les paramètres de requête
  // Ex: /artisans/recherche?nom=Dumont → nom = 'Dumont'
  const [searchParams] = useSearchParams()
  const nomRecherche = searchParams.get('nom')

  const [artisans, setArtisans] = useState([])
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    // Titre de page dynamique selon le contexte
    if (nomRecherche) {
      document.title = `Recherche "${nomRecherche}" - Trouve ton artisan`
    } else {
      document.title = `${categorie} - Trouve ton artisan`
    }

    const fetchArtisans = async () => {
      setLoading(true)
      setErreur(null)

      try {
        // Construction de l'URL selon qu'on est en recherche ou par catégorie
        let url
        if (nomRecherche) {
          url = `${API_URL}/artisans/search?nom=${encodeURIComponent(nomRecherche)}`
        } else {
          url = `${API_URL}/artisans?categorie=${encodeURIComponent(categorie)}`
        }

        const response = await fetch(url, {
          headers: { 'x-api-key': API_KEY }
        })

        // Gestion du cas "aucun résultat" (404)
        if (response.status === 404) {
          setArtisans([])
          return
        }

        if (!response.ok) throw new Error('Erreur lors du chargement')

        const data = await response.json()
        setArtisans(data)

      } catch (error) {
        setErreur('Impossible de charger les artisans.')
        console.error('Erreur :', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtisans()

  // Le tableau de dépendances : se re-déclenche si l'URL change
  }, [categorie, nomRecherche])

  // Titre affiché dans la page
  const titrePage = nomRecherche
    ? `Résultats pour "${nomRecherche}"`
    : `Artisans - ${categorie}`

  return (
    <>
      {/* Bannière de page */}
      <section className="hero" aria-label={titrePage}>
        <div className="container">
          <h1 className="hero__title">{titrePage}</h1>
          {!nomRecherche && (
            <p className="hero__subtitle">
              Trouvez le meilleur artisan de la région Auvergne-Rhône-Alpes
            </p>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="titre-liste">
        <div className="container">
          <h2 id="titre-liste" className="visually-hidden">{titrePage}</h2>

          {/* Chargement */}
          {loading && (
            <div className="text-center py-4" role="status" aria-live="polite">
              <div className="spinner-border text-primary" aria-hidden="true"></div>
              <p className="mt-2">Chargement en cours...</p>
            </div>
          )}

          {/* Erreur */}
          {erreur && (
            <div className="alert alert-danger" role="alert">
              {erreur}
            </div>
          )}

          {/* Aucun résultat */}
          {!loading && !erreur && artisans.length === 0 && (
            <div className="text-center py-5">
              <p className="fs-4 text-muted">
                Aucun artisan trouvé
                {nomRecherche ? ` pour "${nomRecherche}"` : ` dans la catégorie ${categorie}`}.
              </p>
            </div>
          )}

          {/* Liste des artisans */}
          {!loading && !erreur && artisans.length > 0 && (
            <>
              <p className="text-muted mb-4">
                {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}
              </p>
              <div className="row g-4">
                {artisans.map((artisan) => (
                  <div key={artisan.id_artisan} className="col-12 col-md-6 col-lg-4">
                    <ArtisanCard artisan={artisan} />
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </section>
    </>
  )
}

export default ListeArtisans
