const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();

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
app.get('/accueil', function(req, res) {
  res.sendFile(path.join(__dirname, "Calendier.html"));
});

// Route pour l'autre page (édition)
app.get('/autre', function(req, res) {
  res.sendFile(path.join(__dirname, "Edit.html"));
});

// Route API pour récupérer les événements
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des événements:', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});





// Lancement du serveur sur le port 8000
app.listen(8000, () => {
  console.log("App listening on port 8000...");
});
