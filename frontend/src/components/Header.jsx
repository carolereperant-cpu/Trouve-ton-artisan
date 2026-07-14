// ============================================================
// components/Header.jsx
// Header commun à toutes les pages
// Contient : logo, navigation par catégories, barre de recherche
// ============================================================

import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.png'

// URL de l'API et clé depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

function Header() {
  // État : liste des catégories récupérées depuis l'API
  const [categories, setCategories] = useState([])
  // État : valeur de la barre de recherche
  const [recherche, setRecherche] = useState('')
  // Hook pour naviguer vers une autre page
  const navigate = useNavigate()

  // useEffect : s'exécute une fois au chargement du composant
  // Récupère les catégories depuis l'API pour le menu
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`, {
          headers: { 'x-api-key': API_KEY }
        })
        // Si la réponse n'est pas OK, on lance une erreur
        if (!response.ok) throw new Error('Erreur réseau')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Erreur chargement catégories :', error)
      }
    }

    fetchCategories()
  }, []) // [] = ne se déclenche qu'une seule fois

  // Gestion de la soumission du formulaire de recherche
  const handleRecherche = (e) => {
    e.preventDefault() // Empêche le rechargement de la page
    if (recherche.trim()) {
      // Redirige vers la page liste avec le paramètre de recherche
      navigate(`/artisans/recherche?nom=${encodeURIComponent(recherche)}`)
      setRecherche('')
    }
  }

  return (
    <header className="header" role="banner">
      <div className="container">
        <nav className="navbar navbar-expand-lg p-0" aria-label="Navigation principale">

          {/* Logo cliquable qui renvoie à l'accueil */}
          <Link to="/" className="navbar-brand" aria-label="Trouve ton artisan - Accueil">
            <img
              src={logo}
              alt="Trouve ton artisan - Avec la région Auvergne-Rhône-Alpes"
              className="header__logo"
            />
          </Link>

          {/* Bouton hamburger pour mobile */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Ouvrir le menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu de navigation */}
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav mx-auto gap-1" role="list">
              {/* On affiche les catégories récupérées depuis la BDD */}
              {categories.map((cat) => (
                <li key={cat.id_categorie} className="nav-item">
                  <NavLink
                    to={`/artisans/${encodeURIComponent(cat.nom_categorie)}`}
                    className={({ isActive }) =>
                      `header__nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {cat.nom_categorie}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Barre de recherche */}
            <form
              onSubmit={handleRecherche}
              className="d-flex align-items-center gap-2"
              role="search"
              aria-label="Rechercher un artisan"
            >
              <input
                type="search"
                className="header__search form-control"
                placeholder="Rechercher un artisan..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                aria-label="Nom de l'artisan à rechercher"
              />
              <button
                type="submit"
                className="btn btn-primary"
                aria-label="Lancer la recherche"
              >
                🔍
              </button>
            </form>
          </div>

        </nav>
      </div>
    </header>
  )
}

export default Header
