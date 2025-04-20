-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 20 avr. 2025 à 23:52
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bdd_calendrier`
--

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT 0,
  `likes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `club_id`, `title`, `date`, `location`, `description`, `is_visible`, `likes`) VALUES
(1, 2, 'Atelier de Théâtre 1', '2025-01-15 14:00:00', 'Salle A', 'Atelier de théâtre pour débutants', 1, 24),
(2, 2, 'Atelier de Théâtre 2', '2025-02-10 16:00:00', 'Salle A', 'Atelier de théâtre avancé', 1, 45),
(3, 2, 'Atelier de Théâtre 3', '2025-03-20 18:00:00', 'Salle A', 'Improvisation théâtrale', 1, 12),
(4, 2, 'Atelier de Théâtre 4', '2025-04-05 10:00:00', 'Salle A', 'Lecture de scénarios', 1, 56),
(5, 2, 'Atelier de Théâtre 5', '2025-05-15 12:00:00', 'Salle A', 'Jeux dramatiques', 1, 35),
(6, 2, 'Atelier de Théâtre 6', '2025-06-25 14:00:00', 'Salle A', 'Techniques de voix', 1, 68),
(7, 2, 'Atelier de Théâtre 7', '2025-07-10 16:00:00', 'Salle A', 'Mise en scène', 1, 89),
(8, 2, 'Atelier de Théâtre 8', '2025-08-20 18:00:00', 'Salle A', 'Expression corporelle', 1, 23),
(9, 2, 'Atelier de Théâtre 9', '2025-09-05 10:00:00', 'Salle A', 'Création de personnages', 1, 45),
(10, 2, 'Atelier de Théâtre 10', '2025-10-15 12:00:00', 'Salle A', 'Théâtre classique', 1, 67),
(11, 3, 'Concert de Musique 1', '2025-01-20 19:00:00', 'Auditorium', 'Concert de musique classique', 1, 34),
(12, 3, 'Concert de Musique 2', '2025-02-25 20:00:00', 'Auditorium', 'Concert de jazz', 1, 56),
(13, 3, 'Concert de Musique 3', '2025-03-10 21:00:00', 'Auditorium', 'Concert de rock', 1, 78),
(14, 3, 'Concert de Musique 4', '2025-04-15 19:00:00', 'Auditorium', 'Concert de pop', 1, 23),
(15, 3, 'Concert de Musique 5', '2025-05-20 20:00:00', 'Auditorium', 'Concert de folk', 1, 46),
(16, 3, 'Concert de Musique 6', '2025-06-25 21:00:00', 'Auditorium', 'Concert de blues', 1, 67),
(17, 3, 'Concert de Musique 7', '2025-07-10 19:00:00', 'Auditorium', 'Concert de musique électronique', 1, 89),
(18, 3, 'Concert de Musique 8', '2025-08-15 20:00:00', 'Auditorium', 'Concert de world music', 1, 12),
(19, 3, 'Concert de Musique 9', '2025-09-20 21:00:00', 'Auditorium', 'Concert de musique classique', 1, 34),
(20, 3, 'Concert de Musique 10', '2025-10-25 19:00:00', 'Auditorium', 'Concert de jazz', 1, 56),
(21, 4, 'Cours de Danse 1', '2025-01-12 17:00:00', 'Studio de Danse', 'Cours de danse classique', 1, 78),
(22, 4, 'Cours de Danse 2', '2025-02-18 18:00:00', 'Studio de Danse', 'Cours de danse contemporaine', 1, 23),
(23, 4, 'Cours de Danse 3', '2025-03-24 19:00:00', 'Studio de Danse', 'Cours de danse hip-hop', 1, 45),
(24, 4, 'Cours de Danse 4', '2025-04-30 20:00:00', 'Studio de Danse', 'Cours de danse jazz', 1, 67),
(25, 4, 'Cours de Danse 5', '2025-05-06 17:00:00', 'Studio de Danse', 'Cours de danse de salon', 1, 89),
(26, 4, 'Cours de Danse 6', '2025-06-12 18:00:00', 'Studio de Danse', 'Cours de danse moderne', 1, 12),
(27, 4, 'Cours de Danse 7', '2025-07-18 19:00:00', 'Studio de Danse', 'Cours de danse folklorique', 1, 34),
(28, 4, 'Cours de Danse 8', '2025-08-24 20:00:00', 'Studio de Danse', 'Cours de danse de rue', 1, 56),
(29, 4, 'Cours de Danse 9', '2025-09-30 17:00:00', 'Studio de Danse', 'Cours de danse de ballet', 1, 78),
(30, 4, 'Cours de Danse 10', '2025-10-06 18:00:00', 'Studio de Danse', 'Cours de danse de tango', 1, 23),
(31, 5, 'Atelier Photo 1', '2025-01-14 15:00:00', 'Salle B', 'Atelier de photographie de paysage', 1, 45),
(32, 5, 'Atelier Photo 2', '2025-02-21 16:00:00', 'Salle B', 'Atelier de photographie de portrait', 1, 68),
(33, 5, 'Atelier Photo 3', '2025-03-28 17:00:00', 'Salle B', 'Atelier de photographie de rue', 1, 89),
(34, 5, 'Atelier Photo 4', '2025-04-04 18:00:00', 'Salle B', 'Atelier de photographie nocturne', 1, 12),
(35, 5, 'Atelier Photo 5', '2025-05-11 15:00:00', 'Salle B', 'Atelier de photographie de nature morte', 1, 34),
(36, 5, 'Atelier Photo 6', '2025-06-18 16:00:00', 'Salle B', 'Atelier de photographie de sport', 1, 56),
(37, 5, 'Atelier Photo 7', '2025-07-25 17:00:00', 'Salle B', 'Atelier de photographie de mariage', 1, 78),
(38, 5, 'Atelier Photo 8', '2025-08-01 18:00:00', 'Salle B', 'Atelier de photographie de mode', 1, 23),
(39, 5, 'Atelier Photo 9', '2025-09-07 15:00:00', 'Salle B', 'Atelier de photographie de voyage', 1, 45),
(40, 5, 'Atelier Photo 10', '2025-10-14 16:00:00', 'Salle B', 'Atelier de photographie de macro', 1, 67),
(41, 6, 'Atelier Cuisine 1', '2025-01-16 16:00:00', 'Cuisine', 'Atelier de cuisine italienne', 1, 89),
(42, 6, 'Atelier Cuisine 2', '2025-02-23 17:00:00', 'Cuisine', 'Atelier de cuisine française', 1, 12),
(43, 6, 'Atelier Cuisine 3', '2025-03-01 18:00:00', 'Cuisine', 'Atelier de cuisine asiatique', 1, 34),
(44, 6, 'Atelier Cuisine 4', '2025-04-08 16:00:00', 'Cuisine', 'Atelier de cuisine végétarienne', 1, 56),
(45, 6, 'Atelier Cuisine 5', '2025-05-15 17:00:00', 'Cuisine', 'Atelier de cuisine mexicaine', 1, 78),
(46, 6, 'Atelier Cuisine 6', '2025-06-22 18:00:00', 'Cuisine', 'Atelier de cuisine indienne', 1, 23),
(47, 6, 'Atelier Cuisine 7', '2025-07-29 16:00:00', 'Cuisine', 'Atelier de cuisine méditerranéenne', 1, 45),
(48, 6, 'Atelier Cuisine 8', '2025-08-05 17:00:00', 'Cuisine', 'Atelier de cuisine japonaise', 1, 67),
(49, 6, 'Atelier Cuisine 9', '2025-09-12 18:00:00', 'Cuisine', 'Atelier de cuisine thaïlandaise', 1, 89),
(50, 6, 'Atelier Cuisine 10', '2025-10-19 16:00:00', 'Cuisine', 'Atelier de cuisine espagnole', 1, 12),
(51, 7, 'Match de Football 1', '2025-01-17 15:00:00', 'Stade A', 'Match amical de football', 1, 50),
(52, 7, 'Tournoi de Basket 2', '2025-02-24 16:00:00', 'Gymnase', 'Tournoi de basket inter-clubs', 1, 62),
(53, 7, 'Course à Pied 3', '2025-03-31 09:00:00', 'Parc Central', 'Course de 5km dans le parc', 1, 38),
(54, 7, 'Compétition de Natation 4', '2025-04-18 14:00:00', 'Piscine Municipale', 'Compétition de natation', 1, 74),
(55, 7, 'Entraînement de Tennis 5', '2025-05-25 10:00:00', 'Courts de Tennis', 'Entraînement de tennis ouvert', 1, 41),
(56, 7, 'Randonnée en Vélo 6', '2025-06-01 08:00:00', 'Départ: Place Centrale', 'Randonnée en vélo de 20km', 1, 59),
(57, 7, 'Séance de Fitness 7', '2025-07-08 18:00:00', 'Salle de Sport', 'Séance de fitness en groupe', 1, 83),
(58, 7, 'Tournoi de Volley 8', '2025-08-15 16:00:00', 'Gymnase', 'Tournoi de volley-ball', 1, 29),
(59, 7, 'Course d\'Obstacles 9', '2025-09-22 10:00:00', 'Parc Central', 'Course d\'obstacles en plein air', 1, 65),
(60, 7, 'Entraînement de Boxe 10', '2025-10-29 19:00:00', 'Salle de Sport', 'Entraînement de boxe pour débutants', 1, 47),
(61, 8, 'Discussion Littéraire 1', '2025-01-19 17:00:00', 'Bibliothèque', 'Discussion sur les classiques', 1, 40),
(62, 8, 'Club de Livre 2', '2025-02-26 18:00:00', 'Bibliothèque', 'Club de livre du mois', 1, 52),
(63, 8, 'Soirée Poésie 3', '2025-03-23 19:00:00', 'Bibliothèque', 'Soirée de lecture de poésie', 1, 35),
(64, 8, 'Atelier d\'Écriture 4', '2025-04-30 16:00:00', 'Bibliothèque', 'Atelier d\'écriture créative', 1, 68),
(65, 8, 'Rencontre avec un Auteur 5', '2025-05-27 17:00:00', 'Bibliothèque', 'Rencontre avec un auteur local', 1, 43),
(66, 8, 'Cercle de Lecture 6', '2025-06-24 18:00:00', 'Bibliothèque', 'Cercle de lecture thématique', 1, 57),
(67, 8, 'Débat Littéraire 7', '2025-07-31 19:00:00', 'Bibliothèque', 'Débat sur la littérature contemporaine', 1, 72),
(68, 8, 'Lecture de Contes 8', '2025-08-28 16:00:00', 'Bibliothèque', 'Lecture de contes pour enfants', 1, 30),
(69, 8, 'Analyse de Texte 9', '2025-09-25 17:00:00', 'Bibliothèque', 'Analyse de texte littéraire', 1, 61),
(70, 8, 'Échange de Livres 10', '2025-10-22 18:00:00', 'Bibliothèque', 'Échange de livres entre membres', 1, 45),
(71, 9, 'Projection de Film 1', '2025-01-21 20:00:00', 'Salle de Projection', 'Projection d\'un film classique', 1, 55),
(72, 9, 'Soirée Cinéma 2', '2025-02-28 19:00:00', 'Salle de Projection', 'Soirée cinéma thématique', 1, 67),
(73, 9, 'Débat sur le Cinéma 3', '2025-03-25 20:00:00', 'Salle de Projection', 'Débat sur les films récents', 1, 39),
(74, 9, 'Atelier de Réalisation 4', '2025-04-22 17:00:00', 'Salle de Projection', 'Atelier de réalisation de courts-métrages', 1, 70),
(75, 9, 'Rencontre avec un Réalisateur 5', '2025-05-29 19:00:00', 'Salle de Projection', 'Rencontre avec un réalisateur', 1, 44),
(76, 9, 'Festival de Courts-Métrages 6', '2025-06-26 18:00:00', 'Salle de Projection', 'Festival de courts-métrages étudiants', 1, 58),
(77, 9, 'Analyse de Film 7', '2025-07-23 20:00:00', 'Salle de Projection', 'Analyse de film et discussion', 1, 73),
(78, 9, 'Projection de Documentaires 8', '2025-08-30 19:00:00', 'Salle de Projection', 'Projection de documentaires', 1, 32),
(79, 9, 'Soirée Cinéma en Plein Air 9', '2025-09-27 20:00:00', 'Parc Central', 'Projection en plein air', 1, 64),
(80, 9, 'Atelier de Critique 10', '2025-10-24 19:00:00', 'Salle de Projection', 'Atelier de critique cinématographique', 1, 46),
(81, 10, 'Soirée Jeux de Plateau 1', '2025-01-23 18:00:00', 'Salle de Jeux', 'Soirée jeux de plateau', 1, 51),
(82, 10, 'Tournoi de Jeux de Cartes 2', '2025-02-20 19:00:00', 'Salle de Jeux', 'Tournoi de jeux de cartes', 1, 63),
(83, 10, 'Atelier Création de Jeux 3', '2025-03-27 17:00:00', 'Salle de Jeux', 'Atelier de création de jeux de société', 1, 42),
(84, 10, 'Soirée Jeux de Rôle 4', '2025-04-24 18:00:00', 'Salle de Jeux', 'Soirée jeux de rôle', 1, 71),
(85, 10, 'Échange de Jeux 5', '2025-05-21 19:00:00', 'Salle de Jeux', 'Échange de jeux entre membres', 1, 46),
(86, 10, 'Soirée Jeux Vintage 6', '2025-06-28 18:00:00', 'Salle de Jeux', 'Soirée jeux vintage', 1, 59),
(87, 10, 'Tournoi de Jeux de Stratégie 7', '2025-07-25 19:00:00', 'Salle de Jeux', 'Tournoi de jeux de stratégie', 1, 74),
(88, 10, 'Atelier Peinture de Figurines 8', '2025-08-22 17:00:00', 'Salle de Jeux', 'Atelier de peinture de figurines', 1, 33),
(89, 10, 'Soirée Jeux Coopératifs 9', '2025-09-29 18:00:00', 'Salle de Jeux', 'Soirée jeux coopératifs', 1, 66),
(90, 10, 'Découverte de Nouveaux Jeux 10', '2025-10-26 19:00:00', 'Salle de Jeux', 'Découverte de nouveaux jeux', 1, 48),
(91, 11, 'Atelier Recyclage 1', '2025-01-25 16:00:00', 'Salle d\'Atelier', 'Atelier de recyclage créatif', 1, 53),
(92, 11, 'Conférence sur l\'Écologie 2', '2025-02-22 18:00:00', 'Amphithéâtre', 'Conférence sur les enjeux écologiques', 1, 65),
(93, 11, 'Nettoyage de Plage 3', '2025-03-29 10:00:00', 'Plage Locale', 'Nettoyage de plage communautaire', 1, 44),
(94, 11, 'Atelier Compostage 4', '2025-04-26 17:00:00', 'Salle d\'Atelier', 'Atelier sur le compostage', 1, 72),
(95, 11, 'Plantation d\'Arbres 5', '2025-05-23 09:00:00', 'Parc Central', 'Journée de plantation d\'arbres', 1, 47),
(96, 11, 'Atelier Économie d\'Énergie 6', '2025-06-30 16:00:00', 'Salle d\'Atelier', 'Atelier sur l\'économie d\'énergie', 1, 60),
(97, 11, 'Conférence sur le Climat 7', '2025-07-27 18:00:00', 'Amphithéâtre', 'Conférence sur le changement climatique', 1, 75),
(98, 11, 'Atelier Jardinage Urbain 8', '2025-08-24 17:00:00', 'Salle d\'Atelier', 'Atelier de jardinage urbain', 1, 36),
(99, 11, 'Collecte de Déchets 9', '2025-09-30 10:00:00', 'Quartier Local', 'Collecte de déchets dans le quartier', 1, 68),
(100, 11, 'Atelier Réduction des Déchets 10', '2025-10-27 16:00:00', 'Salle d\'Atelier', 'Atelier sur la réduction des déchets', 1, 49),
(101, 12, 'Atelier de Code 1', '2025-01-18 17:00:00', 'Salle Informatique', 'Atelier de programmation pour débutants', 1, 57),
(102, 12, 'Hackathon 2', '2025-02-25 18:00:00', 'Salle Informatique', 'Hackathon sur un thème spécifique', 1, 69),
(103, 12, 'Atelier Algorithmes 3', '2025-03-22 19:00:00', 'Salle Informatique', 'Atelier sur les algorithmes', 1, 48),
(104, 12, 'Conférence Tech 4', '2025-04-29 17:00:00', 'Amphithéâtre', 'Conférence sur les nouvelles technologies', 1, 76),
(105, 12, 'Atelier Développement Web 5', '2025-05-26 18:00:00', 'Salle Informatique', 'Atelier de développement web', 1, 51),
(106, 12, 'Atelier IA 6', '2025-06-23 19:00:00', 'Salle Informatique', 'Atelier sur l\'intelligence artificielle', 1, 63),
(107, 12, 'Compétition de Code 7', '2025-07-30 17:00:00', 'Salle Informatique', 'Compétition de programmation', 1, 79),
(108, 12, 'Atelier Cybersécurité 8', '2025-08-27 18:00:00', 'Salle Informatique', 'Atelier sur la cybersécurité', 1, 42),
(109, 12, 'Projet Open Source 9', '2025-09-24 19:00:00', 'Salle Informatique', 'Participation à un projet open source', 1, 65),
(110, 12, 'Atelier Développement Mobile 10', '2025-10-21 17:00:00', 'Salle Informatique', 'Atelier de développement d\'applications mobiles', 1, 54),
(111, 13, 'Excursion en Montagne 1', '2025-01-20 08:00:00', 'Point de Rendez-vous', 'Excursion en montagne', 1, 60),
(112, 13, 'Visite Culturelle 2', '2025-02-27 10:00:00', 'Musée', 'Visite d\'un musée local', 1, 72),
(113, 13, 'Randonnée Nature 3', '2025-03-24 09:00:00', 'Parc Naturel', 'Randonnée dans un parc naturel', 1, 53),
(114, 13, 'Escapade Urbaine 4', '2025-04-30 08:00:00', 'Gare Centrale', 'Exploration d\'une ville voisine', 1, 77),
(115, 13, 'Camping Sauvage 5', '2025-05-28 09:00:00', 'Site de Camping', 'Camping en pleine nature', 1, 56),
(116, 13, 'Voyage à Vélo 6', '2025-06-25 08:00:00', 'Point de Départ', 'Voyage à vélo sur une journée', 1, 68),
(117, 13, 'Excursion en Bateau 7', '2025-07-31 10:00:00', 'Port', 'Excursion en bateau sur le lac', 1, 74),
(118, 13, 'Visite Historique 8', '2025-08-27 09:00:00', 'Site Historique', 'Visite d\'un site historique', 1, 49),
(119, 13, 'Séjour à la Mer 9', '2025-09-23 08:00:00', 'Plage', 'Séjour à la plage pour la journée', 1, 62),
(120, 13, 'Exploration de Grottes 10', '2025-10-29 09:00:00', 'Entrée des Grottes', 'Exploration de grottes locales', 1, 55),
(121, 14, 'Atelier Aquarelle 1', '2025-01-22 16:00:00', 'Salle d\'Art', 'Atelier de peinture à l\'aquarelle', 1, 58),
(122, 14, 'Atelier Acrylique 2', '2025-02-26 17:00:00', 'Salle d\'Art', 'Atelier de peinture acrylique', 1, 70),
(123, 14, 'Atelier Huile 3', '2025-03-23 18:00:00', 'Salle d\'Art', 'Atelier de peinture à l\'huile', 1, 52),
(124, 14, 'Atelier Pastel 4', '2025-04-27 16:00:00', 'Salle d\'Art', 'Atelier de peinture au pastel', 1, 75),
(125, 14, 'Atelier Dessin 5', '2025-05-24 17:00:00', 'Salle d\'Art', 'Atelier de dessin au crayon', 1, 59),
(126, 14, 'Atelier Collage 6', '2025-06-28 18:00:00', 'Salle d\'Art', 'Atelier de collage artistique', 1, 71),
(127, 14, 'Atelier Gravure 7', '2025-07-25 16:00:00', 'Salle d\'Art', 'Atelier de gravure', 1, 54),
(128, 14, 'Atelier Fresque 8', '2025-08-29 17:00:00', 'Salle d\'Art', 'Atelier de création de fresques', 1, 73),
(129, 14, 'Atelier Encaustique 9', '2025-09-26 18:00:00', 'Salle d\'Art', 'Atelier de peinture à l\'encaustique', 1, 57),
(130, 14, 'Atelier Mixte 10', '2025-10-23 16:00:00', 'Salle d\'Art', 'Atelier de techniques mixtes', 1, 69),
(131, 15, 'Débat Politique 1', '2025-01-24 18:00:00', 'Salle de Conférence', 'Débat sur les politiques actuelles', 1, 61),
(132, 15, 'Débat Économique 2', '2025-02-21 19:00:00', 'Salle de Conférence', 'Débat sur les enjeux économiques', 1, 74),
(133, 15, 'Débat Social 3', '2025-03-28 17:00:00', 'Salle de Conférence', 'Débat sur les questions sociales', 1, 55),
(134, 15, 'Débat Environnemental 4', '2025-04-25 18:00:00', 'Salle de Conférence', 'Débat sur les enjeux environnementaux', 1, 77),
(135, 15, 'Débat Technologique 5', '2025-05-22 19:00:00', 'Salle de Conférence', 'Débat sur les avancées technologiques', 1, 58),
(136, 15, 'Débat Culturel 6', '2025-06-29 17:00:00', 'Salle de Conférence', 'Débat sur les questions culturelles', 1, 70),
(137, 15, 'Débat Éducatif 7', '2025-07-26 18:00:00', 'Salle de Conférence', 'Débat sur les systèmes éducatifs', 1, 53),
(138, 15, 'Débat Scientifique 8', '2025-08-23 19:00:00', 'Salle de Conférence', 'Débat sur les découvertes scientifiques', 1, 72),
(139, 15, 'Débat Philosophique 9', '2025-09-30 17:00:00', 'Salle de Conférence', 'Débat sur les questions philosophiques', 1, 56),
(140, 15, 'Débat International 10', '2025-10-27 18:00:00', 'Salle de Conférence', 'Débat sur les relations internationales', 1, 68),
(141, 16, 'Séance de Yoga Matinale 1', '2025-01-26 08:00:00', 'Studio de Yoga', 'Séance de yoga le matin', 1, 63),
(142, 16, 'Atelier de Méditation 2', '2025-02-23 17:00:00', 'Studio de Yoga', 'Atelier de méditation guidée', 1, 75),
(143, 16, 'Séance de Yoga Vinyasa 3', '2025-03-30 18:00:00', 'Studio de Yoga', 'Séance de yoga vinyasa', 1, 57),
(144, 16, 'Atelier de Respiration 4', '2025-04-27 16:00:00', 'Studio de Yoga', 'Atelier sur les techniques de respiration', 1, 78),
(145, 16, 'Séance de Yoga Hatha 5', '2025-05-24 17:00:00', 'Studio de Yoga', 'Séance de yoga hatha', 1, 60),
(146, 16, 'Atelier de Relaxation 6', '2025-06-28 18:00:00', 'Studio de Yoga', 'Atelier de relaxation profonde', 1, 71),
(147, 16, 'Séance de Yoga Ashtanga 7', '2025-07-25 16:00:00', 'Studio de Yoga', 'Séance de yoga ashtanga', 1, 54),
(148, 16, 'Atelier de Yoga Nidra 8', '2025-08-29 17:00:00', 'Studio de Yoga', 'Atelier de yoga nidra', 1, 73),
(149, 16, 'Séance de Yoga Iyengar 9', '2025-09-26 18:00:00', 'Studio de Yoga', 'Séance de yoga iyengar', 1, 58),
(150, 16, 'Atelier de Yoga Prénatal 10', '2025-10-23 16:00:00', 'Studio de Yoga', 'Atelier de yoga prénatal', 1, 69),
(159, 17, 'TEST1', '2025-01-01 00:00:00', 'QSDVQSDV', 'QDFBQRFB', 0, 0),
(160, 1, 'hgfjygfx', '2025-01-01 00:00:00', 'hjgcjgcjf', 'jhcgcfgf', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','club') NOT NULL DEFAULT 'club',
  `color` varchar(7) NOT NULL DEFAULT '#ffffff',
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `color`, `description`) VALUES
(1, 'BDE', 'leo.gresle@gmail.com', '$2b$10$0XPQxoiokP0Od2jHayPHDOawBOaBk4H1mcbcmB1f.D7T7YmPklOQa', 'admin', '#ff80ff', 'bde test'),
(2, 'Club de Théâtre', 'A@gmail.com', '1', 'club', '#FFD700', 'Club de théâtre pour les amateurs et les passionnés'),
(3, 'Club de Musique', 'B@gmail.com', '1', 'club', '#90EE90', 'Club de musique pour tous les genres musicaux'),
(4, 'Club de Danse', 'C@gmail.com', '1', 'club', '#FFB6C1', 'Club de danse pour tous les styles de danse'),
(5, 'Club de Photographie', 'D@gmail.com', '1', 'club', '#ADD8E6', 'Club de photographie pour les passionnés de l\'image'),
(6, 'Club de Cuisine', 'E@gmail.com', '1', 'club', '#FFFACD', 'Club de cuisine pour découvrir et partager des recettes'),
(7, 'Club de Sport', 'F@gmail.com', '1', 'club', '#D8BFD8', 'Club de sport pour tous les types d\'activités sportives'),
(8, 'Club de Lecture', 'G@gmail.com', '1', 'club', '#F0E68C', 'Club de lecture pour les amoureux des livres'),
(9, 'Club de Cinéma', 'H@gmail.com', '1', 'club', '#E0FFFF', 'Club de cinéma pour les passionnés de films'),
(10, 'Club de Jeux de Société', 'I@gmail.com', '1', 'club', '#F5DEB3', 'Club de jeux de société pour tous les types de jeux'),
(11, 'Club de Développement Durable', 'J@gmail.com', '1', 'club', '#98FB98', 'Club de développement durable pour un avenir meilleur'),
(12, 'Club de Programmation', 'K@gmail.com', '1', 'club', '#FFF5EE', 'Club de programmation pour les passionnés de code'),
(13, 'Club de Voyage', 'L@gmail.com', '1', 'club', '#F0FFF0', 'Club de voyage pour explorer le monde'),
(14, 'Club de Peinture', 'M@gmail.com', '1', 'club', '#F5F5DC', 'Club de peinture pour les artistes en herbe'),
(15, 'Club de Débat', 'N@gmail.com', '1', 'club', '#F0F8FF', 'Club de débat pour discuter des sujets d\'actualité'),
(16, 'Club de Yoga', 'O@gmail.com', '1', 'club', '#F5DEB3', 'Club de yoga pour la relaxation et le bien-être'),
(17, 'test1', 'macsimemaxime@gmail.com', '$2b$10$Xl/vumiTYXehChBLioR1YuXQz0tgl1KSeEREGKGaCIKlj9qgWaBWy', 'club', '#ffffff', 'sdfgwdfgwd');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `club_id` (`club_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
