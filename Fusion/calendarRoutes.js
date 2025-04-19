const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('./config/db');
const { isAuthenticated, isClub, isAdmin, isAdminOrClub } = require('./middlewares/auth');

// Pages accessibles uniquement si connecté
router.get('/accueil', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Calendrier.html'));
});

router.get('/edition', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Edit.html'));
});

// Récupère tous les événements avec couleur de club
router.get('/api/events-with-colors', async (req, res) => {
  const sql = `
    SELECT e.*, u.name AS club_name, u.color
    FROM events e
    JOIN users u ON e.club_id = u.id
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Erreur lors de la récupération des événements:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Récupère les clubs
router.get('/api/clubs', async (req, res) => {
  const sql = 'SELECT id, name, description, color FROM users';
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Erreur lors de la récupération des clubs:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Ajouter un événement (réservé aux clubs ou admins)
router.post('/api/events', async (req, res) => {
  const { title, description, datetime, location, is_visible } = req.body;

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

  try {
    await db.query(query, [title, description, datetime, location, is_visible, clubId]);
    res.status(201).send('Événement ajouté avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'événement:', err);
    res.status(500).send('Erreur serveur');
  }
});

// Récupère les événements du club connecté
router.get('/api/my-events', async (req, res) => {
  const clubId = req.session.club_id; // Vérifie ici si le club_id existe
  if (!clubId) {
    console.log('Erreur: Aucun club associé à la session.');
    return res.status(401).json({ error: 'Non connecté ou club non associé' });
  }

  try {
    const [events] = await db.query('SELECT * FROM events WHERE club_id = ?', [clubId]);
    res.json(events);
  } catch (err) {
    console.error('Erreur lors de la récupération des événements du club:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
  }
});


// Supprimer un événement
router.delete('/api/events/:id', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [eventId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }

    res.status(200).json({ message: 'Événement supprimé avec succès' });
  } catch (err) {
    console.error('[DELETE EVENT] Erreur :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Modifier la visibilité
router.put('/api/events/:id/visibility', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  const { isVisible } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE events SET is_visible = ? WHERE id = ?',
      [isVisible ? 1 : 0, eventId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }

    res.json({ message: 'Visibilité mise à jour avec succès' });
  } catch (err) {
    console.error('[UPDATE VISIBILITY] Erreur :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Modifier description club
router.put('/api/club/description', isAuthenticated, async (req, res) => {
  const userId = req.session.user.id; // ou req.user.id selon comment tu gères l'auth
  const { description } = req.body;

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Description invalide.' });
  }

  try {
    const [result] = await db.query('UPDATE users SET description = ? WHERE id = ?', [description, userId]);
    res.json({ message: 'Description mise à jour.' });
  } catch (err) {
    console.error('[UPDATE DESCRIPTION] Erreur :', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});


// Modifier couleur club
router.put('/api/club/color', isAuthenticated, async (req, res) => {
  const userId = req.session.user.id; // Assure-toi que l'utilisateur est bien identifié
  const { color } = req.body;

  // Optionnel : valider que c'est bien un code hexadécimal (ex: "#ffffff")
  const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
  if (!hexColorRegex.test(color)) {
    return res.status(400).json({ error: 'Format de couleur invalide' });
  }

  try {
    const [result] = await db.query('UPDATE users SET color = ? WHERE id = ?', [color, userId]);
    res.json({ message: 'Couleur mise à jour' });
  } catch (err) {
    console.error('[UPDATE COLOR] Erreur :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Like / Unlike
router.post('/api/events/:id/like', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  try {
    await db.query('UPDATE events SET likes = likes + 1 WHERE id = ?', [eventId]);
    res.json({ message: 'Like ajouté avec succès !' });
  } catch (err) {
    console.error('Erreur lors du like de l\'événement:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post('/api/events/:id/unlike', isAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  try {
    await db.query('UPDATE events SET likes = likes - 1 WHERE id = ?', [eventId]);
    res.json({ message: 'Unlike effectué avec succès !' });
  } catch (err) {
    console.error('Erreur lors du unlike de l\'événement:', err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// Récupère les données du club connecté
router.get('/api/club/me', isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  try {
    const [rows] = await db.query('SELECT name, description, color FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'Club non trouvé' });
    res.json(rows[0]);
  } catch (err) {
    console.error('[GET CLUB DATA] Erreur :', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});


module.exports = router;