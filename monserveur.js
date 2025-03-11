var express = require('express');
var path = require('path');
var app = express();

// Servir les fichiers statiques (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/accueil', function(req, res) {
  res.sendFile(path.join(__dirname, "Calendier.html"));
});

// Route pour l'autre page
app.get('/autre', function(req, res) {
  res.sendFile(path.join(__dirname, "Edit.html"));
});

// Lancement du serveur sur le port 8000
app.listen(8000, () => {
  console.log("App listening on port 8000...");
});
