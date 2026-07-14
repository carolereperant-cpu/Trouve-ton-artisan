// ============================================================
// models/Artisan.js
// Modèle Sequelize pour la table "artisan"
// ============================================================

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define(
    'Artisan',
    {
        id_artisan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        note: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: false
        },
        ville: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        a_propos: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        // Site web optionnel
        site_web: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        // Booléen : artisan mis en avant en page d'accueil
        top: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        // Photo optionnelle
        photo: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        // Clé étrangère vers la table specialite
        id_specialite: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'artisan',
        timestamps: false
    }
);

module.exports = Artisan;
