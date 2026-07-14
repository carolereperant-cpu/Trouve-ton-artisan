// ============================================================
// routes/artisans.js
// Routes pour les artisans
// ============================================================

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // Op = opérateurs Sequelize (LIKE, etc.)
const Artisan = require('../models/Artisan');
const Specialite = require('../models/Specialite');
const Categorie = require('../models/Categorie');

// Définition des associations entre les modèles
// Cela permet à Sequelize de faire les JOIN automatiquement
Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite' });
Specialite.belongsTo(Categorie, { foreignKey: 'id_categorie' });
Specialite.hasMany(Artisan, { foreignKey: 'id_specialite' });
Categorie.hasMany(Specialite, { foreignKey: 'id_categorie' });

// ============================================================
// GET /artisans/top
// Récupère les artisans mis en avant (top = 1)
// Utilisé pour la section "artisans du mois" en page d'accueil
// IMPORTANT : cette route doit être AVANT /artisans/:id
// sinon Express interpréterait "top" comme un id !
// ============================================================
router.get('/top', async (req, res) => {
    try {
        const artisans = await Artisan.findAll({
            where: { top: 1 }, // WHERE top = 1
            include: [
                {
                    // JOIN avec la table specialite
                    model: Specialite,
                    attributes: ['nom_specialite'],
                    include: [
                        {
                            // JOIN avec la table categorie
                            model: Categorie,
                            attributes: ['nom_categorie']
                        }
                    ]
                }
            ],
            // On n'affiche pas l'email et l'a_propos dans cette liste
            attributes: ['id_artisan', 'nom', 'note', 'ville', 'photo'],
            order: [['note', 'DESC']] // Tri par note décroissante
        });

        res.status(200).json(artisans);

    } catch (error) {
        console.error('Erreur GET /artisans/top :', error);
        res.status(500).json({
            message: 'Erreur lors de la récupération des artisans du mois'
        });
    }
});

// ============================================================
// GET /artisans?categorie=Bâtiment
// Récupère tous les artisans d'une catégorie
// Utilisé pour la page liste des artisans
// ============================================================
router.get('/', async (req, res) => {
    try {
        // On récupère le paramètre "categorie" dans l'URL
        const { categorie } = req.query;

        // Si aucune catégorie n'est précisée, on retourne une erreur
        if (!categorie) {
            return res.status(400).json({
                message: 'Paramètre "categorie" manquant. Ex: /artisans?categorie=Bâtiment'
            });
        }

        const artisans = await Artisan.findAll({
            include: [
                {
                    model: Specialite,
                    attributes: ['nom_specialite'],
                    include: [
                        {
                            model: Categorie,
                            attributes: ['nom_categorie'],
                            // WHERE sur la catégorie
                            where: { nom_categorie: categorie }
                        }
                    ]
                }
            ],
            attributes: ['id_artisan', 'nom', 'note', 'ville', 'photo'],
            order: [['note', 'DESC']]
        });

        // Si aucun artisan trouvé pour cette catégorie
        if (artisans.length === 0) {
            return res.status(404).json({
                message: `Aucun artisan trouvé pour la catégorie "${categorie}"`
            });
        }

        res.status(200).json(artisans);

    } catch (error) {
        console.error('Erreur GET /artisans :', error);
        res.status(500).json({
            message: 'Erreur lors de la récupération des artisans'
        });
    }
});

// ============================================================
// GET /artisans/search?nom=Dumont
// Recherche d'artisans par nom
// Utilisé pour la barre de recherche du header
// ============================================================
router.get('/search', async (req, res) => {
    try {
        const { nom } = req.query;

        if (!nom) {
            return res.status(400).json({
                message: 'Paramètre "nom" manquant. Ex: /artisans/search?nom=Dumont'
            });
        }

        const artisans = await Artisan.findAll({
            where: {
                // Op.like = LIKE en SQL, '%' = n'importe quel caractère
                nom: { [Op.like]: `%${nom}%` }
            },
            include: [
                {
                    model: Specialite,
                    attributes: ['nom_specialite']
                }
            ],
            attributes: ['id_artisan', 'nom', 'note', 'ville', 'photo'],
            order: [['nom', 'ASC']]
        });

        res.status(200).json(artisans);

    } catch (error) {
        console.error('Erreur GET /artisans/search :', error);
        res.status(500).json({
            message: 'Erreur lors de la recherche des artisans'
        });
    }
});

// ============================================================
// GET /artisans/:id
// Récupère un artisan par son id (fiche détail)
// Utilisé pour la page "Fiche artisan"
// ============================================================
router.get('/:id', async (req, res) => {
    try {
        // req.params.id = l'id dans l'URL (ex: /artisans/3 → id = 3)
        const id = parseInt(req.params.id);

        // Vérification que l'id est bien un nombre
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'L\'id doit être un nombre entier'
            });
        }

        const artisan = await Artisan.findOne({
            where: { id_artisan: id },
            include: [
                {
                    model: Specialite,
                    attributes: ['nom_specialite'],
                    include: [
                        {
                            model: Categorie,
                            attributes: ['nom_categorie']
                        }
                    ]
                }
            ],
            // On récupère TOUTES les infos pour la fiche détail
            attributes: [
                'id_artisan', 'nom', 'note', 'ville',
                'a_propos', 'email', 'site_web', 'photo'
            ]
        });

        // Si l'artisan n'existe pas en base
        if (!artisan) {
            return res.status(404).json({
                message: `Aucun artisan trouvé avec l'id ${id}`
            });
        }

        res.status(200).json(artisan);

    } catch (error) {
        console.error('Erreur GET /artisans/:id :', error);
        res.status(500).json({
            message: 'Erreur lors de la récupération de l\'artisan'
        });
    }
});

module.exports = router;
