// ============================================================
// config/database.js
// Configuration de la connexion à MySQL via Sequelize
// ============================================================

// On importe Sequelize et les variables d'environnement
const { Sequelize } = require('sequelize');
require('dotenv').config();

// On crée une instance Sequelize avec les infos du fichier .env
// Sequelize est un ORM : il traduit le JavaScript en requêtes SQL
// On n'a donc pas besoin d'écrire du SQL à la main dans l'API
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Nom de la base de données
    process.env.DB_USER,     // Nom d'utilisateur MySQL
    process.env.DB_PASSWORD, // Mot de passe MySQL
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',    // On précise qu'on utilise MySQL

        // On désactive les logs SQL dans la console (mettre true pour déboguer)
        logging: false,
    }
);

module.exports = sequelize;
