// calendarRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('./config/db'); // ← adapte ce chemin à ton fichier de connexion MySQL
const { isAuthenticated, isClub, isAdmin, isAdminOrClub } = require('./middlewares/auth');


// Pages accessibles uniquement si connecté
router.get('/accueil', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Calendrier.html'));
});

router.get('/edition', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Edit.html'));
});

// Récupère tous les événements avec couleur de club
router.get('/api/events-with-colors', isAuthenticated, (req, res) => {
    const sql = `
    SELECT e.*, u.color
    FROM events e
    JOIN users u ON e.club_name = u.name
  `;  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des événements:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// Récupère les clubs
router.get('/api/clubs', (req, res) => {
    const sql = 'SELECT id, name, description, color FROM users';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: 'Erreur serveur' });
      res.json(results);
    });
  });
  

// Ajouter un événement (réservé aux clubs ou admins ?)
router.post('/api/events', (req, res) => {
    const { title, description, datetime, location, is_visible } = req.body;
    
    // Vérifier que l'utilisateur est connecté et que son club est dans la session
    if (!req.session.club_id) {
      return res.status(400).send('Aucun club associé à l\'utilisateur');
    }
  
    const clubId = req.session.club_id; // Récupérer l'ID du club à partir de la session
  
    // Vérification que tous les champs sont présents
    if (!title || !description || !datetime || !location) {
      return res.status(400).send('Veuillez remplir tous les champs.');
    }
  
    const query = `
      INSERT INTO events (title, description, date, location, is_visible, club_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.query(query, [title, description, datetime, location, is_visible, clubId], (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'ajout de l\'événement:', err);
        return res.status(500).send('Erreur serveur');
      }
      res.status(201).send('Événement ajouté avec succès');
    });
  });


router.get('/api/my-events', async (req, res) => {
  const clubName = req.session.club_id;

  if (!clubName) {
    return res.status(401).json({ error: "Utilisateur non connecté ou club non défini." });
  }

  try {
    const [events] = await db.query('SELECT * FROM events WHERE club = ?', [clubName]);
    res.json(events);
  } catch (err) {
    console.error('Erreur lors de la récupération des événements du club connecté:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

  
  

// Supprimer un événement
router.delete('/api/events/:id', isClub, (req, res) => {
  const eventId = req.params.id;

  const sql = "DELETE FROM events WHERE id = ?";
  db.query(sql, [eventId], (err) => {
    if (err) return res.status(500).json({ error: "Erreur serveur." });
    res.json({ message: "Événement supprimé avec succès !" });
  });
});

// Modifier la visibilité
router.put('/api/events/:id/visibility', isClub, (req, res) => {
  const eventId = req.params.id;
  const { isVisible } = req.body;

  const sql = "UPDATE events SET is_visible = ? WHERE id = ?";
  db.query(sql, [isVisible, eventId], (err) => {
    if (err) return res.status(500).json({ error: "Erreur serveur." });
    res.json({ message: "Visibilité mise à jour avec succès !" });
  });
});

// Modifier description club
router.put('/api/clubs/:id/description', (req, res) => {
    const { description } = req.body;
    db.query('UPDATE users SET description = ? WHERE id = ?', [description, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Erreur serveur.' });
      res.json({ message: "Description mise à jour avec succès !" });
    });
});

// Modifier couleur club
router.put('/api/clubs/:id/color', (req, res) => {
    const { color } = req.body;
    db.query('UPDATE users SET color = ? WHERE id = ?', [color, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Erreur serveur.' });
      res.json({ message: "Couleur mise à jour avec succès !" });
    });
});

// Like / Unlike
router.post('/api/events/:id/like', isAuthenticated, (req, res) => {
  const eventId = req.params.id;
  db.query('UPDATE events SET likes = likes + 1 WHERE id = ?', [eventId], (err) => {
    if (err) return res.status(500).json({ error: "Erreur serveur." });
    res.json({ message: 'Like ajouté avec succès !' });
  });
});

router.post('/api/events/:id/unlike', isAuthenticated, (req, res) => {
  const eventId = req.params.id;
  db.query('UPDATE events SET likes = likes - 1 WHERE id = ?', [eventId], (err) => {
    if (err) return res.status(500).json({ error: "Erreur serveur." });
    res.json({ message: 'Unlike effectué avec succès !' });
  });
});

module.exports = router;
