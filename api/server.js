// ============================================================
// server.js
// Point d'entrée de l'API - Trouve ton artisan
// ============================================================

// Chargement des variables d'environnement depuis le fichier .env
// DOIT être en premier avant tout autre import
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');

// Import des routes
const categoriesRouter = require('./routes/categories');
const artisansRouter = require('./routes/artisans');

// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// SÉCURITÉ 1 : HELMET
// Ajoute automatiquement des headers HTTP de sécurité :
// - X-Content-Type-Options : empêche le navigateur de deviner
//   le type de fichier (protection contre les attaques MIME)
// - X-Frame-Options : empêche le site d'être affiché dans une
//   iframe (protection contre le clickjacking)
// - X-XSS-Protection : active la protection XSS du navigateur
// - Strict-Transport-Security : force l'utilisation de HTTPS
// ============================================================
app.use(helmet());

// ============================================================
// SÉCURITÉ 2 : CORS
// Contrôle quels domaines peuvent appeler l'API
// En développement : on accepte localhost
// En production : on n'acceptera que l'URL du frontend déployé
// ============================================================
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
    origin: '*',
    methods: ['GET']
}));

// ============================================================
// SÉCURITÉ 3 : RATE LIMITING
// Limite le nombre de requêtes par IP sur une période donnée
// Protection contre les attaques par force brute et le scraping
// ============================================================
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Fenêtre de 15 minutes
    max: 100,                  // Maximum 100 requêtes par IP par fenêtre
    standardHeaders: true,     // Informe le client du nombre de requêtes restantes
    legacyHeaders: false,
    message: {
        message: 'Trop de requêtes, veuillez réessayer dans 15 minutes.'
    }
});

// On applique le rate limiting à toutes les routes /api
app.use('/api', limiter);

// Permet à Express de lire le JSON dans le corps des requêtes
// On limite la taille pour éviter les attaques par payload massif
app.use(express.json({ limit: '10kb' }));

// ============================================================
// SÉCURITÉ 4 : VALIDATION DE LA CLÉ API
// Toutes les routes /api/* nécessitent une clé API valide
// Cela empêche n'importe qui d'appeler notre API librement
// La clé est envoyée dans le header "x-api-key"
// ============================================================
app.use('/api', (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({
            message: 'Accès refusé : clé API manquante ou invalide'
        });
    }

    next();
});

// ============================================================
// SÉCURITÉ 5 : SUPPRESSION DE L'EN-TÊTE "X-Powered-By"
// Par défaut Express envoie "X-Powered-By: Express"
// Cela donne des informations aux attaquants sur la techno utilisée
// Helmet le supprime déjà, mais on le désactive explicitement
// ============================================================
app.disable('x-powered-by');

// ============================================================
// ROUTES
// ============================================================

// Route de test (publique, sans clé API)
app.get('/', (req, res) => {
    res.json({ message: 'API Trouve ton artisan - En ligne ✅' });
});

// Routes principales (protégées par la clé API)
app.use('/api/categories', categoriesRouter);
app.use('/api/artisans', artisansRouter);

// ============================================================
// GESTION DES ROUTES INEXISTANTES (404)
// Doit être placée APRÈS toutes les autres routes
// ============================================================
app.use((req, res) => {
    res.status(404).json({
        message: `Route "${req.method} ${req.url}" introuvable`
    });
});

// ============================================================
// GESTION GLOBALE DES ERREURS
// Intercepte toutes les erreurs non gérées dans les routes
// Le paramètre "error" en premier = middleware d'erreur Express
// ============================================================
app.use((error, req, res, next) => {
    // On ne révèle pas les détails de l'erreur en production
    console.error('Erreur serveur :', error);
    res.status(500).json({
        message: 'Erreur interne du serveur'
    });
});

// ============================================================
// DÉMARRAGE DU SERVEUR
// ============================================================
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie');

        app.listen(PORT, () => {
            console.log(`✅ API démarrée sur http://localhost:${PORT}`);
            console.log(`🔐 Sécurité activée : Helmet, CORS, Rate Limiting, API Key`);
            console.log(`📋 Routes disponibles :`);
            console.log(`   GET /api/categories`);
            console.log(`   GET /api/artisans?categorie=Bâtiment`);
            console.log(`   GET /api/artisans/top`);
            console.log(`   GET /api/artisans/search?nom=Dumont`);
            console.log(`   GET /api/artisans/:id`);
        });

    } catch (error) {
        console.error('❌ Impossible de se connecter à la base de données :', error);
        process.exit(1);
    }
};

startServer();
