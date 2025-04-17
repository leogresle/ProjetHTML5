const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sendEmail = require('./config/mailer'); // Pour envoyer des emails
const db = require('./config/db'); // Importer la connexion à la base de données
const session = require('express-session');
const { isAuthenticated, isClub, isAdmin } = require('./middlewares/auth');


dotenv.config();  // Charger les variables d'environnement depuis .env

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const calendarRoutes = require('./calendarRoutes'); // Pour récupérer toutes les routes du calendrier
app.use('/', calendarRoutes); 

  
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

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erreur hachage :', err);
      return res.status(500).send('Erreur hachage');
    }

    const query = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(query, [hashedPassword, userId], (err, result) => {
      if (err) {
        console.error('Erreur update :', err);
        return res.status(500).send('Erreur DB');
      }

      console.log(`[DEBUG] Mot de passe défini pour user ID ${userId}`);
      res.send('Mot de passe enregistré ! Vous pouvez maintenant vous connecter.');
    });
  });
});


// Route pour la connexion (login)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Erreur serveur');
    if (results.length === 0) return res.status(400).send('Utilisateur non trouvé');

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Erreur de mot de passe');

      if (isMatch) {
        req.session.user = user;  // Stocke l'utilisateur dans la session
        req.session.club_id = user.id; // Associe l'ID du club dans la session

        // Rediriger selon le rôle de l'utilisateur
        if (user.role === 'admin') {
          
          return res.redirect('/bde-dashboard.html');
        } else if (user.role === 'club') {
          return res.redirect('/club-dashboard.html');
        } else {
          return res.redirect('/user-dashboard.html');
        }
      } else {
        return res.status(400).send('Mot de passe incorrect');
      }
    });
  });
});  



app.post('/check-email', (req, res) => {
  const { email } = req.body;
  console.log('[DEBUG] Email reçu :', email); // Affiche l’email

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('[DEBUG] Erreur BDD :', err);
      return res.status(500).send('Erreur serveur');
    }

    console.log('[DEBUG] Résultats de la BDD :', results);

    if (results.length === 0) {
      console.log('[DEBUG] Aucune correspondance, redirection vers calendrier');
      return res.redirect('/user-dashboard.html');
    }

    const user = results[0];
    console.log('[DEBUG] Utilisateur trouvé :', user);

    if (!user.password) {
      console.log('[DEBUG] Mot de passe inexistant, redirection vers set-password');
      return res.redirect(`/set-password/${user.id}`);
    }

    console.log('[DEBUG] Mot de passe existant, redirection vers login');
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
  
app.get('/api/clubs', (req, res) => {
    db.query('SELECT email FROM users WHERE role = "club"', (err, results) => {
      if (err) return res.status(500).json([]);
      res.json(results);
    });
});
  

app.get('/user-dashboard.html', isAuthenticated, isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user-dashboard.html'));
});
  
// Vérification middleware pour un utilisateur lambda
function isUser(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'user') {
      return next();
    }
    res.redirect('/');  // Si l'utilisateur n'est pas un "lambda", redirection vers la page d'accueil
}

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erreur lors de la déconnexion');
    }

    // Vérifier que la session est bien détruite
    console.log("Session détruite :", req.session); // Debug
    res.clearCookie('connect.sid'); // Supprime explicitement le cookie de session
    res.redirect('/login.html');
  });
});


// Lancer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
