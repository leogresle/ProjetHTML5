-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 16 mars 2025 à 22:21
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
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `club_name`, `title`, `date`, `location`, `description`) VALUES
(1, 'Club Sportif Polytech', 'Tournoi de Futsal', '2025-04-10 18:00:00', 'Gymnase Polytech', 'Tournoi amical ouvert à tous les étudiants.'),
(2, 'Club Ludique', 'Soirée Jeux de Société', '2025-04-15 19:30:00', 'Salle B204', 'Venez découvrir et jouer à des jeux de société.'),
(3, 'Club Informatique', 'Conférence IA et Éthique', '2025-04-18 14:00:00', 'Amphi 3', 'Une conférence sur l’impact de l’IA sur la société.'),
(4, 'Club Montagne', 'Initiation à l’Escalade', '2025-04-12 10:00:00', 'Mur d’escalade', 'Session d\'initiation à l’escalade en intérieur.'),
(5, 'Club Photo', 'Atelier de Photographie', '2025-04-20 16:00:00', 'Parc du Campus', 'Apprenez les bases de la photographie avec un pro.'),
(6, 'Club Dev', 'Hackathon 24h', '2025-04-25 09:00:00', 'Salle Informatique', 'Un hackathon pour coder un projet innovant en équipe.'),
(7, 'Club Danse', 'Cours de Salsa', '2025-04-22 20:00:00', 'Salle Polytech', 'Venez apprendre les bases de la salsa.'),
(8, 'Ciné Club', 'Projection de Film', '2025-04-17 21:00:00', 'Amphi 5', 'Soirée cinéma avec popcorn et débat après le film.'),
(9, 'Club Échecs', 'Tournoi d’échecs', '2025-04-14 17:00:00', 'Salle des Clubs', 'Tournoi ouvert à tous les niveaux.'),
(10, 'Club Nature', 'Randonnée en forêt', '2025-04-27 08:00:00', 'Départ devant Polytech', 'Randonnée pour découvrir la faune et la flore locales.');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
