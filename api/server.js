require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const categoriesRouter = require('./routes/categories');
const artisansRouter = require('./routes/artisans');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS ouvert pour toutes les origines
app.use(cors());

app.use(express.json());

// Clé API
app.use('/api', (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Clé API invalide' });
    }
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'API Trouve ton artisan - En ligne ✅' });
});

app.use('/api/categories', categoriesRouter);
app.use('/api/artisans', artisansRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Route introuvable' });
});

app.use((error, req, res, next) => {
    console.error('Erreur :', error);
    res.status(500).json({ message: 'Erreur interne' });
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion BDD réussie');
        app.listen(PORT, () => {
            console.log(`✅ API sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erreur BDD :', error);
        process.exit(1);
    }
};

startServer();