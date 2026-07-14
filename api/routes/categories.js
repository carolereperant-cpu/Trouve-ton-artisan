// ============================================================
// routes/categories.js
// Routes pour les catégories
// ============================================================

const express = require('express');
// Un "router" est un mini-serveur Express pour grouper les routes
const router = express.Router();
const Categorie = require('../models/Categorie');

// ============================================================
// GET /categories
// Récupère toutes les catégories
// Utilisé pour alimenter le menu de navigation du frontend
// ============================================================
router.get('/', async (req, res) => {
    try {
        // findAll() = SELECT * FROM categorie ORDER BY nom_categorie
        const categories = await Categorie.findAll({
            order: [['nom_categorie', 'ASC']] // Tri alphabétique
        });

        // On renvoie les données en JSON avec le code 200 (succès)
        res.status(200).json(categories);

    } catch (error) {
        // En cas d'erreur (BDD inaccessible...), on renvoie une erreur 500
        console.error('Erreur GET /categories :', error);
        res.status(500).json({
            message: 'Erreur lors de la récupération des catégories'
        });
    }
});

module.exports = router;
