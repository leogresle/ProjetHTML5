-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 15 avr. 2025 à 18:45
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
-- Base de données : `projet_web_4a`
--

-- --------------------------------------------------------

--
-- Structure de la table `clubs`
--

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(7) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clubs`
--

INSERT INTO `clubs` (`id`, `name`, `color`, `description`) VALUES
(1, 'Club de Théâtre', '#80ff80', 'Club pour les amateurs de théâtre'),
(2, 'Club de Musique', '#33FF57', 'Club pour les passionnés de musique'),
(3, 'Club de Danse', '#3357FF', 'Club de danse pour tous les niveaux'),
(4, 'Club de Photographie', '#F333FF', 'Club pour les amoureux de la photo'),
(5, 'Club de Cuisine', '#FFC300', 'Club pour apprendre et partager des recettes'),
(6, 'Club de Sport', '#C70039', 'Club pour les activités sportives'),
(7, 'Club de Lecture', '#900C3F', 'Club de lecture et discussions littéraires'),
(8, 'Club de Cinéma', '#581845', 'Club pour les cinéphiles'),
(9, 'Club de Jeux de Société', '#DAF7A6', 'Club pour les amateurs de jeux de société'),
(10, 'Club de Développement Durable', '#FFC300', 'Club pour les initiatives écologiques'),
(11, 'Club de Programmation', '#581845', 'Club pour les passionnés de code'),
(12, 'Club de Voyage', '#C70039', 'Club pour organiser des voyages'),
(13, 'Club de Peinture', '#900C3F', 'Club pour les artistes en herbe'),
(14, 'Club de Débat', '#DAF7A6', 'Club pour les discussions et débats'),
(15, 'Club de Yoga', '#FF5733', 'Club pour les séances de yoga'),
(16, 'Club de Randonnée', '#33FF57', 'Club pour les amateurs de randonnée');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `club_name` varchar(100) NOT NULL,
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

INSERT INTO `events` (`id`, `club_name`, `title`, `date`, `location`, `description`, `is_visible`, `likes`) VALUES
(1, 'Club de Théâtre', 'Atelier de Théâtre 1', '2025-01-15 14:00:00', 'Salle A', 'Atelier de théâtre pour débutants', 1, 24),
(2, 'Club de Théâtre', 'Atelier de Théâtre 2', '2025-02-10 16:00:00', 'Salle A', 'Atelier de théâtre avancé', 1, 45),
(3, 'Club de Théâtre', 'Atelier de Théâtre 3', '2025-03-20 18:00:00', 'Salle A', 'Improvisation théâtrale', 1, 12),
(4, 'Club de Théâtre', 'Atelier de Théâtre 4', '2025-04-05 10:00:00', 'Salle A', 'Lecture de scénarios', 1, 56),
(5, 'Club de Théâtre', 'Atelier de Théâtre 5', '2025-05-15 12:00:00', 'Salle A', 'Jeux dramatiques', 1, 35),
(6, 'Club de Théâtre', 'Atelier de Théâtre 6', '2025-06-25 14:00:00', 'Salle A', 'Techniques de voix', 1, 68),
(7, 'Club de Théâtre', 'Atelier de Théâtre 7', '2025-07-10 16:00:00', 'Salle A', 'Mise en scène', 1, 89),
(8, 'Club de Théâtre', 'Atelier de Théâtre 8', '2025-08-20 18:00:00', 'Salle A', 'Expression corporelle', 1, 23),
(9, 'Club de Théâtre', 'Atelier de Théâtre 9', '2025-09-05 10:00:00', 'Salle A', 'Création de personnages', 1, 45),
(10, 'Club de Théâtre', 'Atelier de Théâtre 10', '2025-10-15 12:00:00', 'Salle A', 'Théâtre classique', 1, 67),
(11, 'Club de Musique', 'Concert de Musique 1', '2025-01-20 19:00:00', 'Auditorium', 'Concert de musique classique', 1, 34),
(12, 'Club de Musique', 'Concert de Musique 2', '2025-02-25 20:00:00', 'Auditorium', 'Concert de jazz', 1, 56),
(13, 'Club de Musique', 'Concert de Musique 3', '2025-03-10 21:00:00', 'Auditorium', 'Concert de rock', 1, 78),
(14, 'Club de Musique', 'Concert de Musique 4', '2025-04-15 19:00:00', 'Auditorium', 'Concert de pop', 1, 23),
(15, 'Club de Musique', 'Concert de Musique 5', '2025-05-20 20:00:00', 'Auditorium', 'Concert de folk', 1, 46),
(16, 'Club de Musique', 'Concert de Musique 6', '2025-06-25 21:00:00', 'Auditorium', 'Concert de blues', 1, 67),
(17, 'Club de Musique', 'Concert de Musique 7', '2025-07-10 19:00:00', 'Auditorium', 'Concert de musique électronique', 1, 89),
(18, 'Club de Musique', 'Concert de Musique 8', '2025-08-15 20:00:00', 'Auditorium', 'Concert de world music', 1, 12),
(19, 'Club de Musique', 'Concert de Musique 9', '2025-09-20 21:00:00', 'Auditorium', 'Concert de musique classique', 1, 34),
(20, 'Club de Musique', 'Concert de Musique 10', '2025-10-25 19:00:00', 'Auditorium', 'Concert de jazz', 1, 56),
(21, 'Club de Danse', 'Cours de Danse 1', '2025-01-12 17:00:00', 'Studio de Danse', 'Cours de danse classique', 1, 78),
(22, 'Club de Danse', 'Cours de Danse 2', '2025-02-18 18:00:00', 'Studio de Danse', 'Cours de danse contemporaine', 1, 23),
(23, 'Club de Danse', 'Cours de Danse 3', '2025-03-24 19:00:00', 'Studio de Danse', 'Cours de danse hip-hop', 1, 45),
(24, 'Club de Danse', 'Cours de Danse 4', '2025-04-30 20:00:00', 'Studio de Danse', 'Cours de danse jazz', 1, 67),
(25, 'Club de Danse', 'Cours de Danse 5', '2025-05-06 17:00:00', 'Studio de Danse', 'Cours de danse de salon', 1, 89),
(26, 'Club de Danse', 'Cours de Danse 6', '2025-06-12 18:00:00', 'Studio de Danse', 'Cours de danse moderne', 1, 12),
(27, 'Club de Danse', 'Cours de Danse 7', '2025-07-18 19:00:00', 'Studio de Danse', 'Cours de danse folklorique', 1, 34),
(28, 'Club de Danse', 'Cours de Danse 8', '2025-08-24 20:00:00', 'Studio de Danse', 'Cours de danse de rue', 1, 56),
(29, 'Club de Danse', 'Cours de Danse 9', '2025-09-30 17:00:00', 'Studio de Danse', 'Cours de danse de ballet', 1, 78),
(30, 'Club de Danse', 'Cours de Danse 10', '2025-10-06 18:00:00', 'Studio de Danse', 'Cours de danse de tango', 1, 23),
(31, 'Club de Photographie', 'Atelier Photo 1', '2025-01-14 15:00:00', 'Salle B', 'Atelier de photographie de paysage', 1, 45),
(32, 'Club de Photographie', 'Atelier Photo 2', '2025-02-21 16:00:00', 'Salle B', 'Atelier de photographie de portrait', 1, 68),
(33, 'Club de Photographie', 'Atelier Photo 3', '2025-03-28 17:00:00', 'Salle B', 'Atelier de photographie de rue', 1, 89),
(34, 'Club de Photographie', 'Atelier Photo 4', '2025-04-04 18:00:00', 'Salle B', 'Atelier de photographie nocturne', 1, 12),
(35, 'Club de Photographie', 'Atelier Photo 5', '2025-05-11 15:00:00', 'Salle B', 'Atelier de photographie de nature morte', 1, 34),
(36, 'Club de Photographie', 'Atelier Photo 6', '2025-06-18 16:00:00', 'Salle B', 'Atelier de photographie de sport', 1, 56),
(37, 'Club de Photographie', 'Atelier Photo 7', '2025-07-25 17:00:00', 'Salle B', 'Atelier de photographie de mariage', 1, 78),
(38, 'Club de Photographie', 'Atelier Photo 8', '2025-08-01 18:00:00', 'Salle B', 'Atelier de photographie de mode', 1, 23),
(39, 'Club de Photographie', 'Atelier Photo 9', '2025-09-07 15:00:00', 'Salle B', 'Atelier de photographie de voyage', 1, 45),
(40, 'Club de Photographie', 'Atelier Photo 10', '2025-10-14 16:00:00', 'Salle B', 'Atelier de photographie de macro', 1, 67),
(41, 'Club de Cuisine', 'Atelier Cuisine 1', '2025-01-16 16:00:00', 'Cuisine', 'Atelier de cuisine italienne', 1, 89),
(42, 'Club de Cuisine', 'Atelier Cuisine 2', '2025-02-23 17:00:00', 'Cuisine', 'Atelier de cuisine française', 1, 12),
(43, 'Club de Cuisine', 'Atelier Cuisine 3', '2025-03-01 18:00:00', 'Cuisine', 'Atelier de cuisine asiatique', 1, 34),
(44, 'Club de Cuisine', 'Atelier Cuisine 4', '2025-04-08 16:00:00', 'Cuisine', 'Atelier de cuisine végétarienne', 1, 56),
(45, 'Club de Cuisine', 'Atelier Cuisine 5', '2025-05-15 17:00:00', 'Cuisine', 'Atelier de cuisine mexicaine', 1, 78),
(46, 'Club de Cuisine', 'Atelier Cuisine 6', '2025-06-22 18:00:00', 'Cuisine', 'Atelier de cuisine indienne', 1, 23),
(47, 'Club de Cuisine', 'Atelier Cuisine 7', '2025-07-29 16:00:00', 'Cuisine', 'Atelier de cuisine méditerranéenne', 1, 45),
(48, 'Club de Cuisine', 'Atelier Cuisine 8', '2025-08-05 17:00:00', 'Cuisine', 'Atelier de cuisine japonaise', 1, 67),
(49, 'Club de Cuisine', 'Atelier Cuisine 9', '2025-09-12 18:00:00', 'Cuisine', 'Atelier de cuisine thaïlandaise', 1, 89),
(50, 'Club de Cuisine', 'Atelier Cuisine 10', '2025-10-19 16:00:00', 'Cuisine', 'Atelier de cuisine espagnole', 1, 12),
(51, 'Club de Sport', 'Match de Football 1', '2025-01-17 15:00:00', 'Stade A', 'Match amical de football', 1, 50),
(52, 'Club de Sport', 'Tournoi de Basket 2', '2025-02-24 16:00:00', 'Gymnase', 'Tournoi de basket inter-clubs', 1, 62),
(53, 'Club de Sport', 'Course à Pied 3', '2025-03-31 09:00:00', 'Parc Central', 'Course de 5km dans le parc', 1, 38),
(54, 'Club de Sport', 'Compétition de Natation 4', '2025-04-18 14:00:00', 'Piscine Municipale', 'Compétition de natation', 1, 74),
(55, 'Club de Sport', 'Entraînement de Tennis 5', '2025-05-25 10:00:00', 'Courts de Tennis', 'Entraînement de tennis ouvert', 1, 41),
(56, 'Club de Sport', 'Randonnée en Vélo 6', '2025-06-01 08:00:00', 'Départ: Place Centrale', 'Randonnée en vélo de 20km', 1, 59),
(57, 'Club de Sport', 'Séance de Fitness 7', '2025-07-08 18:00:00', 'Salle de Sport', 'Séance de fitness en groupe', 1, 83),
(58, 'Club de Sport', 'Tournoi de Volley 8', '2025-08-15 16:00:00', 'Gymnase', 'Tournoi de volley-ball', 1, 29),
(59, 'Club de Sport', 'Course d\'Obstacles 9', '2025-09-22 10:00:00', 'Parc Central', 'Course d\'obstacles en plein air', 1, 65),
(60, 'Club de Sport', 'Entraînement de Boxe 10', '2025-10-29 19:00:00', 'Salle de Sport', 'Entraînement de boxe pour débutants', 1, 47),
(61, 'Club de Lecture', 'Discussion Littéraire 1', '2025-01-19 17:00:00', 'Bibliothèque', 'Discussion sur les classiques', 1, 40),
(62, 'Club de Lecture', 'Club de Livre 2', '2025-02-26 18:00:00', 'Bibliothèque', 'Club de livre du mois', 1, 52),
(63, 'Club de Lecture', 'Soirée Poésie 3', '2025-03-23 19:00:00', 'Bibliothèque', 'Soirée de lecture de poésie', 1, 35),
(64, 'Club de Lecture', 'Atelier d\'Écriture 4', '2025-04-30 16:00:00', 'Bibliothèque', 'Atelier d\'écriture créative', 1, 68),
(65, 'Club de Lecture', 'Rencontre avec un Auteur 5', '2025-05-27 17:00:00', 'Bibliothèque', 'Rencontre avec un auteur local', 1, 43),
(66, 'Club de Lecture', 'Cercle de Lecture 6', '2025-06-24 18:00:00', 'Bibliothèque', 'Cercle de lecture thématique', 1, 57),
(67, 'Club de Lecture', 'Débat Littéraire 7', '2025-07-31 19:00:00', 'Bibliothèque', 'Débat sur la littérature contemporaine', 1, 72),
(68, 'Club de Lecture', 'Lecture de Contes 8', '2025-08-28 16:00:00', 'Bibliothèque', 'Lecture de contes pour enfants', 1, 30),
(69, 'Club de Lecture', 'Analyse de Texte 9', '2025-09-25 17:00:00', 'Bibliothèque', 'Analyse de texte littéraire', 1, 61),
(70, 'Club de Lecture', 'Échange de Livres 10', '2025-10-22 18:00:00', 'Bibliothèque', 'Échange de livres entre membres', 1, 45),
(71, 'Club de Cinéma', 'Projection de Film 1', '2025-01-21 20:00:00', 'Salle de Projection', 'Projection d\'un film classique', 1, 55),
(72, 'Club de Cinéma', 'Soirée Cinéma 2', '2025-02-28 19:00:00', 'Salle de Projection', 'Soirée cinéma thématique', 1, 67),
(73, 'Club de Cinéma', 'Débat sur le Cinéma 3', '2025-03-25 20:00:00', 'Salle de Projection', 'Débat sur les films récents', 1, 39),
(74, 'Club de Cinéma', 'Atelier de Réalisation 4', '2025-04-22 17:00:00', 'Salle de Projection', 'Atelier de réalisation de courts-métrages', 1, 70),
(75, 'Club de Cinéma', 'Rencontre avec un Réalisateur 5', '2025-05-29 19:00:00', 'Salle de Projection', 'Rencontre avec un réalisateur', 1, 44),
(76, 'Club de Cinéma', 'Festival de Courts-Métrages 6', '2025-06-26 18:00:00', 'Salle de Projection', 'Festival de courts-métrages étudiants', 1, 58),
(77, 'Club de Cinéma', 'Analyse de Film 7', '2025-07-23 20:00:00', 'Salle de Projection', 'Analyse de film et discussion', 1, 73),
(78, 'Club de Cinéma', 'Projection de Documentaires 8', '2025-08-30 19:00:00', 'Salle de Projection', 'Projection de documentaires', 1, 32),
(79, 'Club de Cinéma', 'Soirée Cinéma en Plein Air 9', '2025-09-27 20:00:00', 'Parc Central', 'Projection en plein air', 1, 64),
(80, 'Club de Cinéma', 'Atelier de Critique 10', '2025-10-24 19:00:00', 'Salle de Projection', 'Atelier de critique cinématographique', 1, 46),
(81, 'Club de Jeux de Société', 'Soirée Jeux de Plateau 1', '2025-01-23 18:00:00', 'Salle de Jeux', 'Soirée jeux de plateau', 1, 51),
(82, 'Club de Jeux de Société', 'Tournoi de Jeux de Cartes 2', '2025-02-20 19:00:00', 'Salle de Jeux', 'Tournoi de jeux de cartes', 1, 63),
(83, 'Club de Jeux de Société', 'Atelier Création de Jeux 3', '2025-03-27 17:00:00', 'Salle de Jeux', 'Atelier de création de jeux de société', 1, 42),
(84, 'Club de Jeux de Société', 'Soirée Jeux de Rôle 4', '2025-04-24 18:00:00', 'Salle de Jeux', 'Soirée jeux de rôle', 1, 71),
(85, 'Club de Jeux de Société', 'Échange de Jeux 5', '2025-05-21 19:00:00', 'Salle de Jeux', 'Échange de jeux entre membres', 1, 46),
(86, 'Club de Jeux de Société', 'Soirée Jeux Vintage 6', '2025-06-28 18:00:00', 'Salle de Jeux', 'Soirée jeux vintage', 1, 59),
(87, 'Club de Jeux de Société', 'Tournoi de Jeux de Stratégie 7', '2025-07-25 19:00:00', 'Salle de Jeux', 'Tournoi de jeux de stratégie', 1, 74),
(88, 'Club de Jeux de Société', 'Atelier Peinture de Figurines 8', '2025-08-22 17:00:00', 'Salle de Jeux', 'Atelier de peinture de figurines', 1, 33),
(89, 'Club de Jeux de Société', 'Soirée Jeux Coopératifs 9', '2025-09-29 18:00:00', 'Salle de Jeux', 'Soirée jeux coopératifs', 1, 66),
(90, 'Club de Jeux de Société', 'Découverte de Nouveaux Jeux 10', '2025-10-26 19:00:00', 'Salle de Jeux', 'Découverte de nouveaux jeux', 1, 48),
(91, 'Club de Développement Durable', 'Atelier Recyclage 1', '2025-01-25 16:00:00', 'Salle d\'Atelier', 'Atelier de recyclage créatif', 1, 53),
(92, 'Club de Développement Durable', 'Conférence sur l\'Écologie 2', '2025-02-22 18:00:00', 'Amphithéâtre', 'Conférence sur les enjeux écologiques', 1, 65),
(93, 'Club de Développement Durable', 'Nettoyage de Plage 3', '2025-03-29 10:00:00', 'Plage Locale', 'Nettoyage de plage communautaire', 1, 44),
(94, 'Club de Développement Durable', 'Atelier Compostage 4', '2025-04-26 17:00:00', 'Salle d\'Atelier', 'Atelier sur le compostage', 1, 72),
(95, 'Club de Développement Durable', 'Plantation d\'Arbres 5', '2025-05-23 09:00:00', 'Parc Central', 'Journée de plantation d\'arbres', 1, 47),
(96, 'Club de Développement Durable', 'Atelier Économie d\'Énergie 6', '2025-06-30 16:00:00', 'Salle d\'Atelier', 'Atelier sur l\'économie d\'énergie', 1, 60),
(97, 'Club de Développement Durable', 'Conférence sur le Climat 7', '2025-07-27 18:00:00', 'Amphithéâtre', 'Conférence sur le changement climatique', 1, 75),
(98, 'Club de Développement Durable', 'Atelier Jardinage Urbain 8', '2025-08-24 17:00:00', 'Salle d\'Atelier', 'Atelier de jardinage urbain', 1, 36),
(99, 'Club de Développement Durable', 'Collecte de Déchets 9', '2025-09-30 10:00:00', 'Quartier Local', 'Collecte de déchets dans le quartier', 1, 68),
(100, 'Club de Développement Durable', 'Atelier Réduction des Déchets 10', '2025-10-27 16:00:00', 'Salle d\'Atelier', 'Atelier sur la réduction des déchets', 1, 49),
(101, 'Club de Programmation', 'Atelier de Code 1', '2025-01-18 17:00:00', 'Salle Informatique', 'Atelier de programmation pour débutants', 1, 57),
(102, 'Club de Programmation', 'Hackathon 2', '2025-02-25 18:00:00', 'Salle Informatique', 'Hackathon sur un thème spécifique', 1, 69),
(103, 'Club de Programmation', 'Atelier Algorithmes 3', '2025-03-22 19:00:00', 'Salle Informatique', 'Atelier sur les algorithmes', 1, 48),
(104, 'Club de Programmation', 'Conférence Tech 4', '2025-04-29 17:00:00', 'Amphithéâtre', 'Conférence sur les nouvelles technologies', 1, 76),
(105, 'Club de Programmation', 'Atelier Développement Web 5', '2025-05-26 18:00:00', 'Salle Informatique', 'Atelier de développement web', 1, 51),
(106, 'Club de Programmation', 'Atelier IA 6', '2025-06-23 19:00:00', 'Salle Informatique', 'Atelier sur l\'intelligence artificielle', 1, 63),
(107, 'Club de Programmation', 'Compétition de Code 7', '2025-07-30 17:00:00', 'Salle Informatique', 'Compétition de programmation', 1, 79),
(108, 'Club de Programmation', 'Atelier Cybersécurité 8', '2025-08-27 18:00:00', 'Salle Informatique', 'Atelier sur la cybersécurité', 1, 42),
(109, 'Club de Programmation', 'Projet Open Source 9', '2025-09-24 19:00:00', 'Salle Informatique', 'Participation à un projet open source', 1, 65),
(110, 'Club de Programmation', 'Atelier Développement Mobile 10', '2025-10-21 17:00:00', 'Salle Informatique', 'Atelier de développement d\'applications mobiles', 1, 54),
(111, 'Club de Voyage', 'Excursion en Montagne 1', '2025-01-20 08:00:00', 'Point de Rendez-vous', 'Excursion en montagne', 1, 60),
(112, 'Club de Voyage', 'Visite Culturelle 2', '2025-02-27 10:00:00', 'Musée', 'Visite d\'un musée local', 1, 72),
(113, 'Club de Voyage', 'Randonnée Nature 3', '2025-03-24 09:00:00', 'Parc Naturel', 'Randonnée dans un parc naturel', 1, 53),
(114, 'Club de Voyage', 'Escapade Urbaine 4', '2025-04-30 08:00:00', 'Gare Centrale', 'Exploration d\'une ville voisine', 1, 77),
(115, 'Club de Voyage', 'Camping Sauvage 5', '2025-05-28 09:00:00', 'Site de Camping', 'Camping en pleine nature', 1, 56),
(116, 'Club de Voyage', 'Voyage à Vélo 6', '2025-06-25 08:00:00', 'Point de Départ', 'Voyage à vélo sur une journée', 1, 68),
(117, 'Club de Voyage', 'Excursion en Bateau 7', '2025-07-31 10:00:00', 'Port', 'Excursion en bateau sur le lac', 1, 74),
(118, 'Club de Voyage', 'Visite Historique 8', '2025-08-27 09:00:00', 'Site Historique', 'Visite d\'un site historique', 1, 49),
(119, 'Club de Voyage', 'Séjour à la Mer 9', '2025-09-23 08:00:00', 'Plage', 'Séjour à la plage pour la journée', 1, 62),
(120, 'Club de Voyage', 'Exploration de Grottes 10', '2025-10-29 09:00:00', 'Entrée des Grottes', 'Exploration de grottes locales', 1, 55),
(121, 'Club de Peinture', 'Atelier Aquarelle 1', '2025-01-22 16:00:00', 'Salle d\'Art', 'Atelier de peinture à l\'aquarelle', 1, 58),
(122, 'Club de Peinture', 'Atelier Acrylique 2', '2025-02-26 17:00:00', 'Salle d\'Art', 'Atelier de peinture acrylique', 1, 70),
(123, 'Club de Peinture', 'Atelier Huile 3', '2025-03-23 18:00:00', 'Salle d\'Art', 'Atelier de peinture à l\'huile', 1, 52),
(124, 'Club de Peinture', 'Atelier Pastel 4', '2025-04-27 16:00:00', 'Salle d\'Art', 'Atelier de peinture au pastel', 1, 75),
(125, 'Club de Peinture', 'Atelier Dessin 5', '2025-05-24 17:00:00', 'Salle d\'Art', 'Atelier de dessin au crayon', 1, 59),
(126, 'Club de Peinture', 'Atelier Collage 6', '2025-06-28 18:00:00', 'Salle d\'Art', 'Atelier de collage artistique', 1, 71),
(127, 'Club de Peinture', 'Atelier Gravure 7', '2025-07-25 16:00:00', 'Salle d\'Art', 'Atelier de gravure', 1, 54),
(128, 'Club de Peinture', 'Atelier Fresque 8', '2025-08-29 17:00:00', 'Salle d\'Art', 'Atelier de création de fresques', 1, 73),
(129, 'Club de Peinture', 'Atelier Encaustique 9', '2025-09-26 18:00:00', 'Salle d\'Art', 'Atelier de peinture à l\'encaustique', 1, 57),
(130, 'Club de Peinture', 'Atelier Mixte 10', '2025-10-23 16:00:00', 'Salle d\'Art', 'Atelier de techniques mixtes', 1, 69),
(131, 'Club de Débat', 'Débat Politique 1', '2025-01-24 18:00:00', 'Salle de Conférence', 'Débat sur les politiques actuelles', 1, 61),
(132, 'Club de Débat', 'Débat Économique 2', '2025-02-21 19:00:00', 'Salle de Conférence', 'Débat sur les enjeux économiques', 1, 74),
(133, 'Club de Débat', 'Débat Social 3', '2025-03-28 17:00:00', 'Salle de Conférence', 'Débat sur les questions sociales', 1, 55),
(134, 'Club de Débat', 'Débat Environnemental 4', '2025-04-25 18:00:00', 'Salle de Conférence', 'Débat sur les enjeux environnementaux', 1, 77),
(135, 'Club de Débat', 'Débat Technologique 5', '2025-05-22 19:00:00', 'Salle de Conférence', 'Débat sur les avancées technologiques', 1, 58),
(136, 'Club de Débat', 'Débat Culturel 6', '2025-06-29 17:00:00', 'Salle de Conférence', 'Débat sur les questions culturelles', 1, 70),
(137, 'Club de Débat', 'Débat Éducatif 7', '2025-07-26 18:00:00', 'Salle de Conférence', 'Débat sur les systèmes éducatifs', 1, 53),
(138, 'Club de Débat', 'Débat Scientifique 8', '2025-08-23 19:00:00', 'Salle de Conférence', 'Débat sur les découvertes scientifiques', 1, 72),
(139, 'Club de Débat', 'Débat Philosophique 9', '2025-09-30 17:00:00', 'Salle de Conférence', 'Débat sur les questions philosophiques', 1, 56),
(140, 'Club de Débat', 'Débat International 10', '2025-10-27 18:00:00', 'Salle de Conférence', 'Débat sur les relations internationales', 1, 68),
(141, 'Club de Yoga', 'Séance de Yoga Matinale 1', '2025-01-26 08:00:00', 'Studio de Yoga', 'Séance de yoga le matin', 1, 63),
(142, 'Club de Yoga', 'Atelier de Méditation 2', '2025-02-23 17:00:00', 'Studio de Yoga', 'Atelier de méditation guidée', 1, 75),
(143, 'Club de Yoga', 'Séance de Yoga Vinyasa 3', '2025-03-30 18:00:00', 'Studio de Yoga', 'Séance de yoga vinyasa', 1, 57),
(144, 'Club de Yoga', 'Atelier de Respiration 4', '2025-04-27 16:00:00', 'Studio de Yoga', 'Atelier sur les techniques de respiration', 1, 78),
(145, 'Club de Yoga', 'Séance de Yoga Hatha 5', '2025-05-24 17:00:00', 'Studio de Yoga', 'Séance de yoga hatha', 1, 60),
(146, 'Club de Yoga', 'Atelier de Relaxation 6', '2025-06-28 18:00:00', 'Studio de Yoga', 'Atelier de relaxation profonde', 1, 71),
(147, 'Club de Yoga', 'Séance de Yoga Ashtanga 7', '2025-07-25 16:00:00', 'Studio de Yoga', 'Séance de yoga ashtanga', 1, 54),
(148, 'Club de Yoga', 'Atelier de Yoga Nidra 8', '2025-08-29 17:00:00', 'Studio de Yoga', 'Atelier de yoga nidra', 1, 73),
(149, 'Club de Yoga', 'Séance de Yoga Iyengar 9', '2025-09-26 18:00:00', 'Studio de Yoga', 'Séance de yoga iyengar', 1, 58),
(150, 'Club de Yoga', 'Atelier de Yoga Prénatal 10', '2025-10-23 16:00:00', 'Studio de Yoga', 'Atelier de yoga prénatal', 1, 69),
(151, 'Club de Théâtre', 'xgnxgn', '2025-01-01 00:00:00', 'rgqrhw', 'xgnxgn', 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `clubs`
--
ALTER TABLE `clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
