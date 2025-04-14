const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sendEmail = require('./config/mailer'); // Pour envoyer des emails
const db = require('./config/db'); // Importer la connexion à la base de données

dotenv.config();  // Charger les variables d'environnement depuis .env

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));


// Middlewares
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
      return res.status(401).send('Vous devez être connecté');
    }
    next();
}
  
function isAdmin(req, res, next) {
    if (req.session.user?.role !== 'admin') {
      return res.status(403).send('Accès refusé');
    }
    next();
}
  
function isClub(req, res, next) {
    if (req.session.user?.role !== 'club') {
      return res.status(403).send('Accès club requis');
    }
    next();
}

  
app.get('/ajouter-club', isAuthenticated, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'createClub.html'));
});
  

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
  
// Route pour afficher la page de définition du mot de passe
app.get('/set-password/:userId', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'set-password.html'));
});

// Route pour changer le mot de passe du club
app.post('/set-password/:userId', (req, res) => {
  const { password } = req.body;
  const userId = req.params.userId;

  // Hachage du mot de passe
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erreur lors du hachage du mot de passe', err);
      return res.status(500).send('Erreur lors du changement du mot de passe');
    }

    // Mettre à jour le mot de passe dans la base de données
    const query = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(query, [hashedPassword, userId], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du mot de passe', err);
        return res.status(500).send('Erreur lors du changement du mot de passe');
      }

      res.send('Mot de passe défini avec succès');
    });
  });
});

// Route pour la connexion (login)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Vérifier si l'utilisateur existe dans la base de données
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).send('Erreur serveur');
      if (results.length === 0) return res.status(400).send('Utilisateur non trouvé');
  
      const user = results[0];
  
      // Vérifier si le mot de passe est correct
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).send('Erreur de mot de passe');
        
        if (isMatch) {
          // Si le mot de passe est correct, on vérifie le rôle
          req.session.user = user;  // Stocker l'utilisateur dans la session
          if (user.role === 'admin') {
            // Si le rôle est "admin", rediriger vers le dashboard BDE
            return res.redirect('/bde-dashboard.html');
          } else if (user.role === 'club') {
            // Si c'est un club, rediriger vers son dashboard
            return res.redirect('/club-dashboard.html');
          } else {
            // Si l'utilisateur est un lambda, rediriger vers la page d'accueil
            return res.redirect('/landing.html');
          }
        } else {
          return res.status(400).send('Mot de passe incorrect');
        }
      });
    });
});
  
  

app.post('/check-email', (req, res) => {
    const { email } = req.body;
  
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return res.status(500).send('Erreur serveur');
  
      if (results.length === 0) {
        // Aucune entrée en BDD → accès lecture seule
        return res.redirect('/calendar.html');
      }
  
      const user = results[0];
  
      // Si aucun mot de passe, redirige vers création
      if (!user.password) {
        return res.redirect(`/set-password/${user.id}`);
      }
  
      // Sinon redirige vers login classique
      return res.redirect('/login.html');
    });
  });  

app.get('/bde-dashboard.html', isAuthenticated, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bde-dashboard.html'));
});
  
app.get('/ajouter-club.html', isAuthenticated, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ajouter-club.html'));
});
  
app.post('/ajouter-club', isAuthenticated, isAdmin, (req, res) => {
    const { email } = req.body;
  
    // Vérifie s'il existe déjà
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
      if (err) return res.status(500).send('Erreur BDD');
  
      if (results.length > 0) {
        return res.send('Ce club existe déjà.');
      }
  
      // Ajout du club avec password NULL
      const insertQuery = 'INSERT INTO users (email, role) VALUES (?, "club")';
      db.query(insertQuery, [email], (err, result) => {
        if (err) return res.status(500).send('Erreur à l\'insertion');
  
        const id = result.insertId;
        const link = `http://localhost:3000/set-password/${id}`;
        const message = `Bienvenue ! Pour activer votre compte club, créez votre mot de passe ici : ${link}`;
  
        // Envoie du mail
        sendEmail(email, 'Création de votre compte Club', message);
  
        res.send('Club ajouté et mail envoyé.');
      });
    });
});

app.get('/club-dashboard.html', isAuthenticated, isClub, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'club-dashboard.html'));
});
  
app.get('/ajouter-evenement.html', isAuthenticated, isClub, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ajouter-evenement.html'));
});
  
// app.post('/ajouter-evenement', isAuthenticated, isClub, (req, res) => {
//     const { titre, description, date } = req.body;
//     const userId = req.session.user.id;

//     const query = 'INSERT INTO events (titre, description, date, club_id) VALUES (?, ?, ?, ?)';
//     db.query(query, [titre, description, date, userId], (err) => {
//         if (err) return res.status(500).send('Erreur lors de l’ajout');
//         res.send('Événement ajouté !');
//     });
// });

app.get('/api/evenements', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
      if (err) return res.status(500).json([]);
      res.json(results);
    });
});
  
app.get('/api/clubs', (req, res) => {
    db.query('SELECT email FROM users WHERE role = "club"', (err, results) => {
      if (err) return res.status(500).json([]);
      res.json(results);
    });
});
  
// Route pour un utilisateur lambda
app.get('/user-dashboard.html', isAuthenticated, isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user-dashboard.html'));
});
  
// Vérification middleware pour un utilisateur lambda
function isUser(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'user') {
      return next();
    }
    res.redirect('/landing.html');  // Si l'utilisateur n'est pas un "lambda", redirection vers la page d'accueil
}
    

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
});

// Lancer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
