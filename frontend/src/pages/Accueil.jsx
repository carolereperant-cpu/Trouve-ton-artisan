// ============================================================
// pages/Accueil.jsx
// Page d'accueil du site
// Contient : explication en étapes + 3 artisans du mois
// ============================================================

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArtisanCard from '../components/ArtisanCard'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

// Les 4 étapes du fonctionnement du site (textes imposés par le brief)
const ETAPES = [
  { numero: 1, texte: 'Choisir la catégorie d\'artisanat dans le menu.' },
  { numero: 2, texte: 'Choisir un artisan.' },
  { numero: 3, texte: 'Le contacter via le formulaire de contact.' },
  { numero: 4, texte: 'Une réponse sera apportée sous 48h.' },
]

function Accueil() {
  // État : artisans du mois (top = 1)
  const [artisansTop, setArtisansTop] = useState([])
  // État : chargement en cours
  const [loading, setLoading] = useState(true)
  // État : message d'erreur
  const [erreur, setErreur] = useState(null)

  // Récupère les artisans "top" au chargement de la page
  useEffect(() => {
    // Met à jour le titre de la page (SEO)
    document.title = 'Trouve ton artisan ! - Accueil'

    const fetchArtisansTop = async () => {
      try {
        const response = await fetch(`${API_URL}/artisans/top`, {
          headers: { 'x-api-key': API_KEY }
        })
        if (!response.ok) throw new Error('Erreur lors du chargement')
        const data = await response.json()
        setArtisansTop(data)
      } catch (error) {
        setErreur('Impossible de charger les artisans du moment.')
        console.error('Erreur :', error)
      } finally {
        // finally s'exécute toujours, succès ou erreur
        setLoading(false)
      }
    }

    fetchArtisansTop()
  }, [])

  return (
    <>
      {/* Balise meta description pour le SEO */}
      {/* Mise à jour via useEffect ci-dessus pour le title */}

      {/* ---- HERO ---- */}
      <section className="hero" aria-label="Présentation">
        <div className="container text-center">
          <h1 className="hero__title">Trouve ton artisan !</h1>
          <p className="hero__subtitle">
            La plateforme de la région Auvergne-Rhône-Alpes pour trouver
            les meilleurs artisans locaux près de chez vous.
          </p>
        </div>
      </section>

      {/* ---- COMMENT TROUVER MON ARTISAN ---- */}
      <section className="how-it-works" aria-labelledby="titre-comment">
        <div className="container">
          <h2 id="titre-comment" className="section-title text-center">
            Comment trouver mon artisan ?
          </h2>
          <div className="row g-3 justify-content-center">
            {ETAPES.map((etape) => (
              <div key={etape.numero} className="col-12 col-sm-6 col-lg-3">
                <div className="how-it-works__step">
                  {/* Numéro de l'étape */}
                  <div
                    className="how-it-works__number"
                    aria-hidden="true"
                  >
                    {etape.numero}
                  </div>
                  <p className="how-it-works__title">{etape.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- ARTISANS DU MOIS ---- */}
      <section className="section" aria-labelledby="titre-top">
        <div className="container">
          <h2 id="titre-top" className="section-title text-center">
            Les artisans du mois
          </h2>

          {/* Affichage conditionnel selon l'état */}
          {loading && (
            <div className="text-center py-4" role="status" aria-live="polite">
              <div className="spinner-border text-primary" aria-hidden="true"></div>
              <p className="mt-2">Chargement en cours...</p>
            </div>
          )}

          {erreur && (
            <div className="alert alert-danger" role="alert">
              {erreur}
            </div>
          )}

          {!loading && !erreur && (
            <div className="row g-4 justify-content-center">
              {artisansTop.map((artisan) => (
                <div key={artisan.id_artisan} className="col-12 col-md-6 col-lg-4">
                  <ArtisanCard artisan={artisan} />
                </div>
              ))}
            </div>
          )}

          {/* Lien vers toutes les catégories */}
          <div className="text-center mt-4">
            <Link to="/artisans/Bâtiment" className="btn btn-primary btn-lg">
              Voir tous les artisans
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Accueil
