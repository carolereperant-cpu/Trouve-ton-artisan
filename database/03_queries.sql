-- ============================================================
-- 03_queries.sql
-- Requêtes utiles pour l'API
-- Projet : Trouve ton artisan - Région Auvergne-Rhône-Alpes
-- ============================================================

USE trouve_ton_artisan;

-- ============================================================
-- REQUÊTE 1 : Récupérer toutes les catégories
-- Utilisée pour alimenter le menu de navigation
-- ============================================================
SELECT id_categorie, nom_categorie
FROM categorie
ORDER BY nom_categorie;

-- ============================================================
-- REQUÊTE 2 : Récupérer les 3 artisans "du mois" (top = 1)
-- Utilisée pour la page d'accueil
-- On joint les tables pour avoir la spécialité avec l'artisan
-- ============================================================
SELECT
    a.id_artisan,
    a.nom,
    a.note,
    a.ville,
    a.photo,
    s.nom_specialite
FROM artisan a
-- JOIN = on "relie" les deux tables via la clé étrangère
JOIN specialite s ON a.id_specialite = s.id_specialite
WHERE a.top = 1
ORDER BY a.note DESC;

-- ============================================================
-- REQUÊTE 3 : Récupérer tous les artisans d'une catégorie
-- Utilisée pour la page liste (ex: catégorie "Bâtiment")
-- On joint les 3 tables pour avoir catégorie + spécialité + artisan
-- ============================================================
SELECT
    a.id_artisan,
    a.nom,
    a.note,
    a.ville,
    a.photo,
    s.nom_specialite,
    c.nom_categorie
FROM artisan a
JOIN specialite s ON a.id_specialite = s.id_specialite
JOIN categorie c ON s.id_categorie = c.id_categorie
-- Le ? sera remplacé par le nom de la catégorie choisie
WHERE c.nom_categorie = 'Bâtiment'
ORDER BY a.note DESC;

-- ============================================================
-- REQUÊTE 4 : Récupérer un artisan par son id (fiche détail)
-- Utilisée pour la page "Fiche artisan"
-- ============================================================
SELECT
    a.id_artisan,
    a.nom,
    a.note,
    a.ville,
    a.a_propos,
    a.email,
    a.site_web,
    a.photo,
    s.nom_specialite,
    c.nom_categorie
FROM artisan a
JOIN specialite s ON a.id_specialite = s.id_specialite
JOIN categorie c ON s.id_categorie = c.id_categorie
-- Le ? sera remplacé par l'id de l'artisan
WHERE a.id_artisan = 1;

-- ============================================================
-- REQUÊTE 5 : Recherche d'artisans par nom
-- Utilisée pour la barre de recherche du header
-- LIKE '%texte%' cherche "texte" n'importe où dans le nom
-- ============================================================
SELECT
    a.id_artisan,
    a.nom,
    a.note,
    a.ville,
    a.photo,
    s.nom_specialite
FROM artisan a
JOIN specialite s ON a.id_specialite = s.id_specialite
-- Le ? sera remplacé par le terme recherché (ex: '%Dumont%')
WHERE a.nom LIKE '%Dumont%'
ORDER BY a.nom;
