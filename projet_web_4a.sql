-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 30 mars 2025 à 00:22
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
  `color` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clubs`
--

INSERT INTO `clubs` (`id`, `name`, `color`) VALUES
(1, 'BDE', '#FF5733'),
(2, 'BDS', '#33FF57'),
(3, 'Polycomedy', '#3357FF');

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
  `is_visible` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `club_name`, `title`, `date`, `location`, `description`, `is_visible`) VALUES
(35, 'BDE', 'Soirée Jeux de Société', '2025-04-15 19:30:00', 'Salle B204', 'Venez découvrir et jouer à des jeux de société.', 1),
(36, 'BDE', 'Atelier de Photographie', '2025-04-15 16:00:00', 'Parc du Campus', 'Apprenez les bases de la photographie avec un pro.', 1),
(37, 'BDE', 'Hackathon 24h', '2025-04-25 09:00:00', 'Salle Informatique', 'Un hackathon pour coder un projet innovant en équipe.', 1),
(38, 'BDE', 'Tournoi d\'Échecs', '2025-04-14 17:00:00', 'Salle des Clubs', 'Tournoi ouvert à tous les niveaux.', 1),
(39, 'BDS', 'Tournoi de Futsal', '2025-04-10 18:00:00', 'Gymnase Polytech', 'Tournoi amical ouvert à tous les étudiants.', 1),
(40, 'BDS', 'Cours de Salsa', '2025-04-25 20:00:00', 'Salle Polytech', 'Venez apprendre les bases de la salsa.', 1),
(41, 'BDS', 'Randonnée en Forêt', '2025-04-27 08:00:00', 'Départ devant Polytech', 'Randonnée pour découvrir la faune et la flore locales.', 1),
(42, 'Polycomedy', 'Projection de Film', '2025-04-17 21:00:00', 'Amphi 5', 'Soirée cinéma avec popcorn et débat après le film.', 1),
(43, 'Polycomedy', 'Conférence IA et Éthique', '2025-04-17 14:00:00', 'Amphi 3', 'Une conférence sur l\'impact de l\'IA sur la société.', 1),
(44, 'Polycomedy', 'Initiation à l\'Escalade', '2025-04-12 10:00:00', 'Mur d\'Escalade', 'Session d\'initiation à l\'escalade en intérieur.', 1),
(48, 'BDS', 'Test BDS', '2025-01-28 06:00:00', 'ICI', 'TETE', 1),
(52, 'Polycomedy', 'test', '2025-01-28 13:00:00', 'dqce', 'descriptiov', 1),
(53, 'Polycomedy', 'Test poly com', '2025-01-02 16:00:00', 'zegqrdbgw', 'sfgqr', 1),
(55, 'BDS', 'fgnsgn', '2025-01-03 12:00:00', 'SC<dv', 'zzttzbq', 1),
(61, 'BDE', 'zbfwdfbw', '2025-01-10 16:00:00', 'dfgwfb', 'fwbfbw', 1),
(63, 'BDE', 'Test visiblité', '2025-01-01 16:00:00', 'rgqregq', 'rqbrb', 1),
(64, 'BDE', 'Test de visi2', '2025-01-02 00:00:00', 'vbwf', 'drbwf', 1),
(65, 'Polycomedy', 'Test visi', '2025-01-01 00:00:00', 'qerbdbr', 'grbwb', 1),
(66, 'BDE', 'Test', '2025-01-28 00:00:00', 'qsvdvvwdv', 'qvwr', 1),
(67, 'BDE', 'dfbwdfb', '2025-01-23 00:00:00', 'xfbvwxfb', 'fbwfw', 1),
(68, 'BDE', 'sgqrg', '2025-01-21 00:00:00', 'sdfbwfb', 'gqrgq', 1),
(69, 'BDE', 'test', '2025-01-21 00:00:00', 'xxvvddvd', 'fgh,', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
