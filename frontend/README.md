# Trouve ton artisan !

Plateforme web de la région Auvergne-Rhône-Alpes permettant aux particuliers de trouver et contacter des artisans locaux.

## Site en ligne

- **Frontend** : https://trouve-ton-artisan-708lj7mu5-carole1.vercel.app
- **API** : https://trouve-ton-artisan-api-5l3y.onrender.com

---

## Description du projet

**Trouve ton artisan !** est une application web full-stack développée dans le cadre d'un projet scolaire. Elle permet aux utilisateurs de :

- Parcourir les artisans par catégorie (Alimentation, Bâtiment, Fabrication, Services)
- Rechercher un artisan par son nom
- Consulter la fiche détaillée d'un artisan
- Contacter un artisan via un formulaire de contact

---

## Technologies utilisées

### Frontend
- **React.js** — bibliothèque JavaScript pour l'interface utilisateur
- **Bootstrap 5** — framework CSS pour le design responsive
- **Sass** — préprocesseur CSS
- **Vite** — outil de build et serveur de développement
- **React Router DOM** — gestion de la navigation

### Backend (API REST)
- **Node.js** — environnement d'exécution JavaScript
- **Express.js** — framework web pour l'API
- **Sequelize** — ORM pour la base de données
- **MySQL** — base de données relationnelle

### Sécurité
- **Helmet.js** — headers HTTP de sécurité
- **express-rate-limit** — limitation du nombre de requêtes
- **CORS** — contrôle des origines autorisées
- **Clé API** — authentification des requêtes

### Hébergement
- **Vercel** — hébergement du frontend
- **Render** — hébergement de l'API
- **Railway** — base de données MySQL en production

### Outils
- **Git et GitHub** — versioning et collaboration
- **MySQL Workbench** — gestion de la base de données
- **Visual Studio Code** — éditeur de code
- **Figma** — maquettage

---

## Structure du projet

```
trouve-ton-artisan/
├── api/                        # Backend Node.js/Express
│   ├── config/
│   │   └── database.js         # Configuration Sequelize
│   ├── models/
│   │   ├── Artisan.js
│   │   ├── Categorie.js
│   │   └── Specialite.js
│   ├── routes/
│   │   ├── artisans.js
│   │   └── categories.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/                   # Frontend React
│   ├── public/
│   │   └── favicon.png
│   ├── src/
│   │   ├── assets/
│   │   │   ├── fonts/          # Police Graphik
│   │   │   └── Logo.png
│   │   ├── components/
│   │   │   ├── ArtisanCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Header.jsx
│   │   ├── pages/
│   │   │   ├── Accueil.jsx
│   │   │   ├── FicheArtisan.jsx
│   │   │   ├── ListeArtisans.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── PageLegale.jsx
│   │   ├── styles/
│   │   │   └── main.scss
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
└── database/                   # Scripts SQL
    ├── 01_schema.sql           # Création des tables
    ├── 02_data.sql             # Insertion des données
    └── 03_queries.sql          # Requêtes utiles
```

---

## Prérequis

- Node.js (version 18 ou supérieure)
- MySQL (version 8 ou supérieure)
- Git

---

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/carolereperant-cpu/Trouve-ton-artisan.git
cd Trouve-ton-artisan
```

### 2. Mettre en place la base de données

Ouvre MySQL Workbench et exécute les scripts dans cet ordre :

```
database/01_schema.sql    # Crée la base de données et les tables
database/02_data.sql      # Insère les données de test
```

### 3. Configurer et lancer l'API

```bash
cd api
cp .env.example .env
npm install
npm run dev
```
Modifie le fichier .env avec tes informations MySQL et ta clé API avant de lancer.

L'API sera accessible sur http://localhost:3000

### 4. Configurer et lancer le Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Modifie le fichier .env avec ta clé API avant de lancer.


Le site sera accessible sur http://localhost:5173

---

## Variables d'environnement

### API (api/.env)

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=ton_mot_de_passe
API_KEY=ta_cle_secrete
```

### Frontend (frontend/.env)

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=ta_cle_secrete
```

---

## Routes de l'API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/categories | Liste toutes les catégories |
| GET | /api/artisans?categorie=Bâtiment | Artisans par catégorie |
| GET | /api/artisans/top | Artisans du mois |
| GET | /api/artisans/search?nom=Dumont | Recherche par nom |
| GET | /api/artisans/:id | Fiche détail d'un artisan |

Toutes les routes /api/* nécessitent le header x-api-key.

---

## Auteur

Carole Reperant — Projet scolaire CEF