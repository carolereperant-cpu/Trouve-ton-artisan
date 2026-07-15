// ============================================================
// server.js
// Point d'entrée de l'API - Trouve ton artisan
// ============================================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');

const categoriesRouter = require('./routes/categories');
const artisansRouter = require('./routes/artisans');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// SÉCURITÉ 1 : HELMET
// Ajoute des headers HTTP de sécurité
// On désactive contentSecurityPolicy et crossOriginOpenerPolicy
// car ils bloquent les requêtes cross-origin depuis Vercel
// ============================================================
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: false,
}));

// ============================================================
// SÉCURITÉ 2 : CORS
// Autorise toutes les origines en GET uniquement
// ============================================================
app.use(cors({
    origin: '*',
    methods: ['GET']
}));

// ============================================================
// SÉCURITÉ 3 : RATE LIMITING
// Maximum 100 requêtes par IP toutes les 15 minutes
// Protection contre les attaques par force brute
// ============================================================
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Trop de requêtes, veuillez réessayer dans 15 minutes.'
    }
});

app.use('/api', limiter);

// Limite la taille des requêtes JSON à 10kb
app.use(express.json({ limit: '10kb' }));

// Supprime le header X-Powered-By pour cacher qu'on utilise Express
app.disable('x-powered-by');

// ============================================================
// SÉCURITÉ 4 : CLÉ API
// Toutes les routes /api/* nécessitent le header x-api-key
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
// ROUTES
// ============================================================

// Route de test publique
app.get('/', (req, res) => {
    res.json({ message: 'API Trouve ton artisan - En ligne ✅' });
});

app.use('/api/categories', categoriesRouter);
app.use('/api/artisans', artisansRouter);

// ============================================================
// GESTION DES ERREURS
// ============================================================

// Route introuvable (404)
app.use((req, res) => {
    res.status(404).json({
        message: `Route "${req.method} ${req.url}" introuvable`
    });
});

// Erreur interne (500)
app.use((error, req, res, next) => {
    console.error('Erreur serveur :', error);
    res.status(500).json({
        message: 'Erreur interne du serveur'
    });
});

// ============================================================
// DÉMARRAGE
// ============================================================
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie');
        app.listen(PORT, () => {
            console.log(`✅ API démarrée sur http://localhost:${PORT}`);
            console.log(`🔐 Sécurité activée : Helmet, CORS, Rate Limiting, API Key`);
        });
    } catch (error) {
        console.error('❌ Impossible de se connecter à la base de données :', error);
        process.exit(1);
    }
};

startServer();