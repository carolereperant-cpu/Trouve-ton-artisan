// ============================================================
// models/Categorie.js
// Modèle Sequelize pour la table "categorie"
// Un modèle = la représentation d'une table en JavaScript
// ============================================================

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define(
    'Categorie',      // Nom du modèle
    {
        // Définition des colonnes de la table
        id_categorie: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom_categorie: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        tableName: 'categorie',   // Nom exact de la table dans MySQL
        timestamps: false         // On désactive les colonnes createdAt/updatedAt
                                  // car elles ne sont pas dans notre schéma
    }
);

module.exports = Categorie;
