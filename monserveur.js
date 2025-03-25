const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors()); // Autoriser les requêtes cross-origin si besoin

// Configuration de la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projet_web_4a'
});

// Connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Servir les fichiers statiques (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/accueil', (req, res) => {
  res.sendFile(path.join(__dirname, "Calendier.html"));
});

// Route pour la page d'édition
app.get('/autre', (req, res) => {
  res.sendFile(path.join(__dirname, "Edit.html"));
});

app.get('/api/events-with-colors', (req, res) => {
  const sql = `
    SELECT e.*, c.color
    FROM events e
    JOIN clubs c ON e.club_name = c.name
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des événements:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// Route API pour récupérer les clubs
app.get('/api/clubs', (req, res) => {
  const sql = 'SELECT * FROM clubs';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des clubs:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});



// Route API pour ajouter un événement
app.post('/api/events', (req, res) => {
  const { title, description, datetime } = req.body;

  if (!title || !description || !datetime) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const sql = "INSERT INTO events (title, description, date) VALUES (?, ?, ?)";
  db.query(sql, [title, description, datetime], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion de l'événement:", err);
      return res.status(500).json({ error: "Erreur serveur." });
    }
    res.status(201).json({ message: "Événement ajouté avec succès !" });
  });
});

// Lancement du serveur sur le port 8080
app.listen(8080, () => {
  console.log("Serveur démarré sur http://localhost:8080");
});
