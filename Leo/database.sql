-- Base de données : bdd_calendrier

-- Table des utilisateurs / clubs
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) ,
  role ENUM('admin', 'club') NOT NULL DEFAULT 'club',
  color VARCHAR(7) NOT NULL DEFAULT '#ffffff',
  description TEXT
);

-- Insertion du BDE (admin)
INSERT INTO users (id, name, email, password, role, color, description) VALUES
(1, 'BDE', 'leo.gresle@gmail.com', NULL, 'admin', '#0000FF', 'Bureau des Étudiants');

-- Table des événements
CREATE TABLE events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  club_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  location VARCHAR(255),
  description TEXT,
  is_visible TINYINT(1) DEFAULT 0,
  likes INT DEFAULT 0,
  FOREIGN KEY (club_id) REFERENCES users(id) ON DELETE CASCADE
);
