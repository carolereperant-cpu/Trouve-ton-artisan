-- ============================================================
-- 02_data.sql
-- Insertion des données de test
-- Projet : Trouve ton artisan - Région Auvergne-Rhône-Alpes
-- ============================================================

USE trouve_ton_artisan;

-- ============================================================
-- INSERTION DES CATÉGORIES
-- Les 4 grandes catégories issues du fichier de données
-- ============================================================
INSERT INTO categorie (nom_categorie) VALUES
    ('Alimentation'),
    ('Bâtiment'),
    ('Fabrication'),
    ('Services');

-- ============================================================
-- INSERTION DES SPÉCIALITÉS
-- On récupère l'id de la catégorie avec une sous-requête
-- pour éviter de coder les id "en dur" (plus robuste)
-- ============================================================
INSERT INTO specialite (nom_specialite, id_categorie) VALUES
    -- Alimentation
    ('Boucher',         (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Alimentation')),
    ('Boulanger',       (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Alimentation')),
    ('Chocolatier',     (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Alimentation')),
    ('Traiteur',        (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Alimentation')),

    -- Bâtiment
    ('Chauffagiste',    (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Bâtiment')),
    ('Electricien',     (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Bâtiment')),
    ('Menuisier',       (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Bâtiment')),
    ('Plombier',        (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Bâtiment')),

    -- Fabrication
    ('Bijoutier',       (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Fabrication')),
    ('Couturier',       (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Fabrication')),
    ('Ferronnier',      (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Fabrication')),

    -- Services
    ('Coiffeur',        (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Services')),
    ('Fleuriste',       (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Services')),
    ('Toiletteur',      (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Services')),
    ('Webdesign',       (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Services'));

-- ============================================================
-- INSERTION DES ARTISANS
-- On utilise des sous-requêtes pour récupérer l'id_specialite
-- ============================================================
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, top, id_specialite) VALUES

    -- ALIMENTATION
    (
        'Boucherie Dumont',
        4.5,
        'Lyon',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'boucherie.dumond@gmail.com',
        NULL,
        0, -- top = FALSE
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Boucher')
    ),
    (
        'Au pain chaud',
        4.8,
        'Montélimar',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'aupainchaud@hotmail.com',
        NULL,
        1, -- top = TRUE
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Boulanger')
    ),
    (
        'Chocolaterie Labbé',
        4.9,
        'Lyon',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'chocolaterie-labbe@gmail.com',
        'https://chocolaterie-labbe.fr',
        1, -- top = TRUE
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Chocolatier')
    ),
    (
        'Traiteur Truchon',
        4.1,
        'Lyon',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'contact@truchon-traiteur.fr',
        'https://truchon-traiteur.fr',
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Traiteur')
    ),

    -- BÂTIMENT
    (
        'Orville Salmons',
        5.0,
        'Evian',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'o-salmons@live.com',
        NULL,
        1, -- top = TRUE
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Chauffagiste')
    ),
    (
        'Mont Blanc Electricité',
        4.5,
        'Chamonix',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'contact@mont-blanc-electricite.com',
        'https://mont-blanc-electricite.com',
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Electricien')
    ),
    (
        'Boutot & fils',
        4.7,
        'Bourg-en-Bresse',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'boutot-menuiserie@gmail.com',
        'https://boutot-menuiserie.com',
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Menuisier')
    ),
    (
        'Vallis Bellemare',
        4.0,
        'Vienne',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'v.bellemare@gmail.com',
        'https://plomberie-bellemare.com',
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Plombier')
    ),

    -- FABRICATION
    (
        'Claude Quinn',
        4.2,
        'Aix-les-Bains',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'claude.quinn@gmail.com',
        NULL,
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Bijoutier')
    ),
    (
        'Amitee Lécuyer',
        4.5,
        'Annecy',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'a.amitee@hotmail.com',
        'https://lecuyer-couture.com',
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Couturier')
    ),
    (
        'Ernest Carignan',
        5.0,
        'Le Puy-en-Velay',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'e-carigan@hotmail.com',
        NULL,
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Ferronnier')
    ),

    -- SERVICES
    (
        'Royden Charbonneau',
        3.8,
        'Saint-Priest',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'r.charbonneau@gmail.com',
        NULL,
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Coiffeur')
    ),
    (
        'Leala Dennis',
        3.8,
        'Chambéry',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'l.dennos@hotmail.fr',
        'https://coiffure-leala-chambery.fr',
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Coiffeur')
    ),
    (
        'C''est sup''hair',
        4.1,
        'Romans-sur-Isère',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'sup-hair@gmail.com',
        'https://sup-hair.fr',
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Coiffeur')
    ),
    (
        'Le monde des fleurs',
        4.6,
        'Annonay',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'contact@le-monde-des-fleurs-annonay.fr',
        'https://le-monde-des-fleurs-annonay.fr',
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Fleuriste')
    ),
    (
        'Valérie Laderoute',
        4.5,
        'Valence',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'v-laredoute@gmail.com',
        NULL,
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Toiletteur')
    ),
    (
        'CM Graphisme',
        4.4,
        'Valence',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'contact@cm-graphisme.com',
        'https://cm-graphisme.com',
        0,
        (SELECT id_specialite FROM specialite WHERE nom_specialite = 'Webdesign')
    );
