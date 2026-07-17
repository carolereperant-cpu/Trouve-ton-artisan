-- ============================================================
-- 01_schema.sql
-- Création de la base de données "trouve_ton_artisan"
-- Projet : Trouve ton artisan - Région Auvergne-Rhône-Alpes
-- ============================================================

-- Supprime la base si elle existe déjà (utile pour repartir proprement)
DROP DATABASE IF EXISTS trouve_ton_artisan;

-- Création de la base de données en UTF-8 pour supporter les accents
CREATE DATABASE trouve_ton_artisan
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Sélectionne la base de données
USE trouve_ton_artisan;

-- ============================================================
-- TABLE : categorie
-- Stocke les 4 grandes catégories d'artisanat
-- (Alimentation, Bâtiment, Fabrication, Services)
-- ============================================================
CREATE TABLE categorie (
    id_categorie    INT             NOT NULL AUTO_INCREMENT,
    nom_categorie   VARCHAR(100)    NOT NULL,

    CONSTRAINT pk_categorie PRIMARY KEY (id_categorie),

    -- Un nom de catégorie doit être unique
    CONSTRAINT uq_categorie_nom UNIQUE (nom_categorie)
);

-- ============================================================
-- TABLE : specialite
-- Stocke les spécialités (Boucher, Electricien, Coiffeur...)
-- Chaque spécialité est rattachée à une seule catégorie
-- ============================================================
CREATE TABLE specialite (
    id_specialite   INT             NOT NULL AUTO_INCREMENT,
    nom_specialite  VARCHAR(100)    NOT NULL,

    -- Clé étrangère vers la table categorie
    id_categorie    INT             NOT NULL,

    CONSTRAINT pk_specialite PRIMARY KEY (id_specialite),

    -- Un nom de spécialité doit être unique
    CONSTRAINT uq_specialite_nom UNIQUE (nom_specialite),

    -- Relation avec la table categorie
    -- ON DELETE RESTRICT : empêche de supprimer une catégorie qui a des spécialités
    -- ON UPDATE CASCADE : si l'id de la catégorie change, la clé étrangère se met à jour
    CONSTRAINT fk_specialite_categorie
        FOREIGN KEY (id_categorie)
        REFERENCES categorie(id_categorie)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- ============================================================
-- TABLE : artisan
-- Stocke les 17 artisans avec toutes leurs informations
-- Chaque artisan est rattaché à une seule spécialité
-- ============================================================
CREATE TABLE artisan (
    id_artisan      INT             NOT NULL AUTO_INCREMENT,
    nom             VARCHAR(150)    NOT NULL,

    -- Note sur 5, avec décimales (ex: 4.5)
    -- DECIMAL(2,1) = 2 chiffres au total, 1 après la virgule
    note            DECIMAL(2,1)    NOT NULL    CHECK (note >= 0 AND note <= 5),

    ville           VARCHAR(100)    NOT NULL,

    -- Texte long pour la description "A propos"
    a_propos        TEXT            NOT NULL,

    email           VARCHAR(255)    NOT NULL,

    -- Site web optionnel (NULL autorisé)
    site_web        VARCHAR(255)    NULL,

    -- Champ booléen : artisan mis en avant sur la page d'accueil
    -- TINYINT(1) est la convention MySQL pour les booléens (0 = false, 1 = true)
    top             TINYINT(1)      NOT NULL    DEFAULT 0,

    -- Nom du fichier image de l'artisan (optionnel)
    photo           VARCHAR(255)    NULL,

    -- Clé étrangère vers la table specialite
    id_specialite   INT             NOT NULL,

    CONSTRAINT pk_artisan PRIMARY KEY (id_artisan),

    -- Relation avec la table specialite
    CONSTRAINT fk_artisan_specialite
        FOREIGN KEY (id_specialite)
        REFERENCES specialite(id_specialite)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
