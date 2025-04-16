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
  res.sendFile(path.join(__dirname, "Calendrier.html"));
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
  const { title, description, datetime, location, club, is_visible } = req.body;

  if (!title || !description || !datetime || !location || !club || is_visible === undefined) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const sql = "INSERT INTO events (title, description, date, location, club_name, is_visible) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, description, datetime, location, club, is_visible], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion de l'événement:", err);
      return res.status(500).json({ error: "Erreur serveur." });
    }
    res.status(201).json({ message: "Événement ajouté avec succès !" });
  });
});


// Route API pour récupérer les événements par club
app.get('/api/events', (req, res) => {
  const clubName = req.query.club;

  if (!clubName) {
    return res.status(400).json({ error: "Le paramètre 'club' est requis." });
  }

  const sql = "SELECT * FROM events WHERE club_name = ?";
  db.query(sql, [clubName], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des événements:", err);
      return res.status(500).json({ error: "Erreur serveur." });
    }
    res.json(results);
  });
});

// Route API pour supprimer un événement
app.delete('/api/events/:id', (req, res) => {
  const eventId = req.params.id;

  const sql = "DELETE FROM events WHERE id = ?";
  db.query(sql, [eventId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'événement:", err);
      return res.status(500).json({ error: "Erreur serveur." });
    }
    res.json({ message: "Événement supprimé avec succès !" });
  });
});

// Route API pour mettre à jour l'état de visibilité d'un événement
app.put('/api/events/:id/visibility', (req, res) => {
  const eventId = req.params.id;
  const { isVisible } = req.body;

  const sql = "UPDATE events SET is_visible = ? WHERE id = ?";
  db.query(sql, [isVisible, eventId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de la visibilité de l'événement:", err);
      return res.status(500).json({ error: "Erreur serveur." });
    }
    res.json({ message: "Visibilité de l'événement mise à jour avec succès !" });
  });
});

// Route API pour mettre à jour la description du club
app.put('/api/clubs/:name/description', (req, res) => {
  const clubName = req.params.name;
  const { description } = req.body;

  const sql = "UPDATE clubs SET description = ? WHERE name = ?";
  db.query(sql, [description, clubName], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de la description du club:", err);
      return res.status(500).json({ error: "Erreur serveur." });
    }
    res.json({ message: "Description du club mise à jour avec succès !" });
  });
});

// Route API pour mettre à jour la couleur du club
app.put('/api/clubs/:name/color', (req, res) => {
  const clubName = req.params.name;
  const { color } = req.body;

  const sql = "UPDATE clubs SET color = ? WHERE name = ?";
  db.query(sql, [color, clubName], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de la couleur du club:", err);
      return res.status(500).json({ error: "Erreur serveur." });
    }
    res.json({ message: "Couleur du club mise à jour avec succès !" });
  });
});

app.post('/api/events/:id/like', async (req, res) => {
  const eventId = req.params.id;

  try {
    // Incrémenter le nombre de likes
    await db.promise().query('UPDATE events SET likes = likes + 1 WHERE id = ?', [eventId]);

    res.json({ message: 'Like ajouté avec succès !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

app.post('/api/events/:id/unlike', async (req, res) => {
  const eventId = req.params.id;

  try {
    // Décrémenter le nombre de likes
    await db.promise().query('UPDATE events SET likes = likes - 1 WHERE id = ?', [eventId]);

    res.json({ message: 'Unlike effectué avec succès !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});



// Lancement du serveur sur le port 8080
app.listen(8080, () => {
  console.log("Serveur démarré sur http://localhost:8080");
});
