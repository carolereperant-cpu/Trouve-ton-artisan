// ============================================================
// components/Footer.jsx
// Footer commun à toutes les pages
// Contient : liens légaux, adresse de contact
// ============================================================

import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="row g-4">

          {/* Colonne 1 : À propos */}
          <div className="col-12 col-md-4">
            <h2 className="footer__title h5">Trouve ton artisan !</h2>
            <p className="footer__address">
              Avec la région Auvergne-Rhône-Alpes,
              trouvez facilement un artisan local
              et contactez-le en quelques clics.
            </p>
          </div>

          {/* Colonne 2 : Liens légaux */}
          <div className="col-12 col-md-4">
            <h2 className="footer__title h5">Informations légales</h2>
            <nav aria-label="Liens légaux">
              <Link to="/mentions-legales" className="footer__link">
                Mentions légales
              </Link>
              <Link to="/donnees-personnelles" className="footer__link">
                Données personnelles
              </Link>
              <Link to="/accessibilite" className="footer__link">
                Accessibilité
              </Link>
              <Link to="/cookies" className="footer__link">
                Cookies
              </Link>
            </nav>
          </div>

          {/* Colonne 3 : Contact */}
          <div className="col-12 col-md-4">
            <h2 className="footer__title h5">Contact</h2>
            {/* Adresse de l'antenne de Lyon fournie dans le brief */}
            <address className="footer__address" style={{ fontStyle: 'normal' }}>
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a
                href="tel:+33426734000"
                className="footer__link d-inline"
              >
                +33 (0)4 26 73 40 00
              </a>
            </address>
          </div>

        </div>

        {/* Ligne de copyright */}
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', marginTop: '2rem' }} />
        <p className="text-center footer__address mb-0" style={{ fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Région Auvergne-Rhône-Alpes — Tous droits réservés
        </p>

      </div>
    </footer>
  )
}

export default Footer
