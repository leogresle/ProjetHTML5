-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 23 mars 2025 à 23:04
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
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `club_name` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `club_name`, `title`, `date`, `location`, `description`, `color`) VALUES
(35, 'BDE', 'Soirée Jeux de Société', '2025-04-15 19:30:00', 'Salle B204', 'Venez découvrir et jouer à des jeux de société.', '#FF5733'),
(36, 'BDE', 'Atelier de Photographie', '2025-04-15 16:00:00', 'Parc du Campus', 'Apprenez les bases de la photographie avec un pro.', '#FF5733'),
(37, 'BDE', 'Hackathon 24h', '2025-04-25 09:00:00', 'Salle Informatique', 'Un hackathon pour coder un projet innovant en équipe.', '#FF5733'),
(38, 'BDE', 'Tournoi d\'Échecs', '2025-04-14 17:00:00', 'Salle des Clubs', 'Tournoi ouvert à tous les niveaux.', '#FF5733'),
(39, 'BDS', 'Tournoi de Futsal', '2025-04-10 18:00:00', 'Gymnase Polytech', 'Tournoi amical ouvert à tous les étudiants.', '#33FF57'),
(40, 'BDS', 'Cours de Salsa', '2025-04-25 20:00:00', 'Salle Polytech', 'Venez apprendre les bases de la salsa.', '#33FF57'),
(41, 'BDS', 'Randonnée en Forêt', '2025-04-27 08:00:00', 'Départ devant Polytech', 'Randonnée pour découvrir la faune et la flore locales.', '#33FF57'),
(42, 'Polycomedy', 'Projection de Film', '2025-04-17 21:00:00', 'Amphi 5', 'Soirée cinéma avec popcorn et débat après le film.', '#3357FF'),
(43, 'Polycomedy', 'Conférence IA et Éthique', '2025-04-17 14:00:00', 'Amphi 3', 'Une conférence sur l\'impact de l\'IA sur la société.', '#3357FF'),
(44, 'Polycomedy', 'Initiation à l\'Escalade', '2025-04-12 10:00:00', 'Mur d\'Escalade', 'Session d\'initiation à l\'escalade en intérieur.', '#3357FF'),
(45, '', 'Aheer', '2025-03-24 16:00:00', NULL, 'rggqr', NULL),
(46, '', 'TEST1', '2025-04-17 14:00:00', NULL, 'superposition', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
