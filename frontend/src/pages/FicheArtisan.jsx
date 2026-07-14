// ============================================================
// pages/FicheArtisan.jsx
// Page de détail d'un artisan
// Contient : infos, note, à propos, formulaire de contact
// ============================================================

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

// Fonction pour afficher les étoiles (même logique que ArtisanCard)
function afficherEtoiles(note) {
  const noteArrondie = Math.round(note * 2) / 2
  let etoiles = ''
  for (let i = 1; i <= 5; i++) {
    if (i <= noteArrondie) etoiles += '★'
    else if (i - 0.5 === noteArrondie) etoiles += '½'
    else etoiles += '☆'
  }
  return etoiles
}

function FicheArtisan() {
  // Récupère l'id dans l'URL : /artisan/3 → id = '3'
  const { id } = useParams()

  const [artisan, setArtisan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState(null)

  // États du formulaire de contact
  const [formulaire, setFormulaire] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  })
  const [envoi, setEnvoi] = useState(null) // 'succes' | 'erreur' | null

  // Chargement des données de l'artisan
  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await fetch(`${API_URL}/artisans/${id}`, {
          headers: { 'x-api-key': API_KEY }
        })
        if (response.status === 404) {
          setErreur('Artisan introuvable.')
          return
        }
        if (!response.ok) throw new Error('Erreur réseau')
        const data = await response.json()
        setArtisan(data)
        // Mise à jour du titre de la page (SEO)
        document.title = `${data.nom} - Trouve ton artisan`
      } catch (error) {
        setErreur('Impossible de charger la fiche artisan.')
        console.error('Erreur :', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtisan()
  }, [id])

  // Gestion des changements dans le formulaire
  // Une seule fonction pour tous les champs (plus propre)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulaire(prev => ({ ...prev, [name]: value }))
  }

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici on simule l'envoi (l'envoi d'email nécessite un backend dédié)
    // En production, on ferait un appel API pour envoyer l'email
    console.log('Formulaire envoyé :', formulaire)
    setEnvoi('succes')
    // Réinitialisation du formulaire
    setFormulaire({ nom: '', email: '', objet: '', message: '' })
  }

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="container section text-center" role="status" aria-live="polite">
        <div className="spinner-border text-primary" aria-hidden="true"></div>
        <p className="mt-2">Chargement en cours...</p>
      </div>
    )
  }

  // Affichage en cas d'erreur
  if (erreur) {
    return (
      <div className="container section">
        <div className="alert alert-danger" role="alert">{erreur}</div>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
      </div>
    )
  }

  return (
    <>
      {/* ---- EN-TÊTE DE LA FICHE ---- */}
      <section className="hero" aria-label={`Fiche de ${artisan.nom}`}>
        <div className="container">
          <div className="d-flex align-items-center gap-4 flex-wrap">

            {/* Photo ou placeholder */}
            {artisan.photo ? (
              <img
                src={artisan.photo}
                alt={`Photo de ${artisan.nom}`}
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white' }}
              />
            ) : (
              <div
                style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}
                aria-hidden="true"
              >
                👷
              </div>
            )}

            <div>
              <h1 className="hero__title mb-1">{artisan.nom}</h1>
              <p className="hero__subtitle mb-1">
                {artisan.Specialite?.nom_specialite} · {artisan.Specialite?.Categorie?.nom_categorie}
              </p>
              <div>
                <span
                  className="stars fs-4"
                  aria-label={`Note : ${artisan.note} sur 5`}
                >
                  {afficherEtoiles(parseFloat(artisan.note))}
                </span>
                <span className="ms-2 text-white-50">({artisan.note}/5)</span>
              </div>
              <p className="hero__subtitle mt-1">📍 {artisan.ville}</p>
            </div>

          </div>
        </div>
      </section>

      <div className="container section">
        <div className="row g-5">

          {/* ---- COLONNE GAUCHE : infos ---- */}
          <div className="col-12 col-lg-7">

            {/* À propos */}
            <section aria-labelledby="titre-apropos">
              <h2 id="titre-apropos" className="section-title">À propos</h2>
              <p className="text-muted lh-lg">{artisan.a_propos}</p>
            </section>

            {/* Site web si disponible */}
            {artisan.site_web && (
              <div className="mt-3">
                <a
                  href={artisan.site_web}
                  target="_blank"
                  rel="noopener noreferrer" // Sécurité : empêche l'accès à window.opener
                  className="btn btn-outline-primary"
                >
                  🌐 Visiter le site web
                </a>
              </div>
            )}

          </div>

          {/* ---- COLONNE DROITE : formulaire de contact ---- */}
          <div className="col-12 col-lg-5">
            <section aria-labelledby="titre-contact">
              <h2 id="titre-contact" className="section-title">Contacter {artisan.nom}</h2>

              {/* Message de succès après envoi */}
              {envoi === 'succes' && (
                <div className="alert alert-success" role="alert">
                  ✅ Votre message a bien été envoyé ! Une réponse vous sera apportée sous 48h.
                </div>
              )}

              {envoi !== 'succes' && (
                <form onSubmit={handleSubmit} noValidate>

                  {/* Nom */}
                  <div className="mb-3">
                    <label htmlFor="nom" className="form-label fw-medium">
                      Votre nom <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      className="form-control"
                      value={formulaire.nom}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      Votre email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formulaire.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="jean.dupont@email.fr"
                    />
                  </div>

                  {/* Objet */}
                  <div className="mb-3">
                    <label htmlFor="objet" className="form-label fw-medium">
                      Objet <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="objet"
                      name="objet"
                      className="form-control"
                      value={formulaire.objet}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="Demande de devis"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-medium">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="5"
                      value={formulaire.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="Décrivez votre besoin..."
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Envoyer le message
                  </button>

                </form>
              )}

            </section>
          </div>

        </div>
      </div>
    </>
  )
}

export default FicheArtisan
