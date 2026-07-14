// ============================================================
// models/Specialite.js
// Modèle Sequelize pour la table "specialite"
// ============================================================

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Specialite = sequelize.define(
    'Specialite',
    {
        id_specialite: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom_specialite: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        // Clé étrangère vers la table categorie
        id_categorie: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'specialite',
        timestamps: false
    }
);

module.exports = Specialite;
