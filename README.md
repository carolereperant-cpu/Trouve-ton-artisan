# Trouve ton artisan ! 

> Plateforme web de la région Auvergne-Rhône-Alpes permettant aux particuliers de trouver et contacter des artisans locaux.

---

##  Description du projet

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

### Outils
- **Git & GitHub** — versioning et collaboration
- **MySQL Workbench** — gestion de la base de données
- **Visual Studio Code** — éditeur de code

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
│   ├── .env.example            # Exemple de variables d'environnement
│   ├── .gitignore
│   ├── package.json
│   └── server.js               # Point d'entrée de l'API
│
├── frontend/                   # Frontend React
│   ├── public/
│   │   └── favicon.png
│   ├── src/
│   │   ├── assets/
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

##  Prérequis

Avant de commencer, assure-toi d'avoir installé :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [MySQL](https://www.mysql.com/) (version 8 ou supérieure)
- [Git](https://git-scm.com/)

---

##  Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/carolereperant-cpu/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Mettre en place la base de données

Ouvre MySQL Workbench et exécute les scripts dans cet ordre :

```bash
# Dans MySQL Workbench, ouvrir et exécuter :
database/01_schema.sql    # Crée la base de données et les tables
database/02_data.sql      # Insère les données de test
```

### 3. Configurer et lancer l'API

```bash
cd api

# Copier le fichier d'exemple et le remplir
cp .env.example .env
# Modifier .env avec tes informations MySQL

# Installer les dépendances
npm install

# Lancer l'API en mode développement
npm run dev
```

L'API sera accessible sur `http://localhost:3000`

### 4. Configurer et lancer le Frontend

```bash
cd frontend

# Copier le fichier d'exemple et le remplir
cp .env.example .env
# Modifier .env avec la clé API

# Installer les dépendances
npm install

# Lancer le frontend en mode développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

---

##  Variables d'environnement

### API (`api/.env`)

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=ton_mot_de_passe
API_KEY=ta_cle_secrete
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=ta_cle_secrete
```

---

##  Routes de l'API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/categories` | Liste toutes les catégories |
| GET | `/api/artisans?categorie=Bâtiment` | Artisans par catégorie |
| GET | `/api/artisans/top` | Artisans du mois |
| GET | `/api/artisans/search?nom=Dumont` | Recherche par nom |
| GET | `/api/artisans/:id` | Fiche détail d'un artisan |

>  Toutes les routes `/api/*` nécessitent le header `x-api-key`.

---

##  Auteur

**Carole Reperant** — Projet scolaire CEF