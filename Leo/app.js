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

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, '..', 'Charly', 'pages')));

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
    res.sendFile(path.join(__dirname, '..', 'Charly', 'index.html'));
});
  
// Route pour afficher la page de définition du mot de passe
app.get('/set-password/:userId', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'set-password.html'));
});

// Route pour changer le mot de passe du club
app.post('/set-password/:userId', async (req, res) => {
  const { password } = req.body;
  const userId = req.params.userId;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'UPDATE users SET password = ? WHERE id = ?';
    await db.query(query, [hashedPassword, userId]);

    console.log(`[DEBUG] Mot de passe défini pour user ID ${userId}`);
    res.send('Mot de passe enregistré ! Vous pouvez maintenant vous connecter.');
  } catch (err) {
    console.error('Erreur dans set-password :', err);
    res.status(500).send('Erreur serveur');
  }
});


// Route pour la connexion (login)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) return res.status(400).send('Utilisateur non trouvé');

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = user;
      req.session.club_id = user.id;

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

  } catch (err) {
    console.error('[LOGIN] Erreur :', err);
    return res.status(500).send('Erreur serveur');
  }
}); 



app.post('/check-email', async (req, res) => {
  const { email } = req.body;
  console.log('[DEBUG] Email reçu :', email);

  const query = 'SELECT * FROM users WHERE email = ?';

  try {
    const [results] = await db.query(query, [email]);
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

  } catch (err) {
    console.error('[DEBUG] Erreur BDD :', err);
    return res.status(500).send('Erreur serveur');
  }
});

 

app.get('/bde-dashboard.html', isAuthenticated, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bde-dashboard.html'));
});
  
app.get('/ajouter-club.html', isAuthenticated, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ajouter-club.html'));
});
  
app.post('/ajouter-club', isAuthenticated, isAdmin, async (req, res) => {
  const { email, name } = req.body;

  try {
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUsers.length > 0) {
      return res.send('Ce club existe déjà.');
    }

    const [insertResult] = await db.query('INSERT INTO users (email, name, role) VALUES (?, ?, "club")', [email, name]);

    const id = insertResult.insertId;
    const link = `http://localhost:3000/set-password/${id}`;
    const message = `Bienvenue ! Pour activer votre compte club, créez votre mot de passe ici : ${link}`;

    sendEmail(email, 'Création de votre compte Club', message);

    res.send('Club ajouté et mail envoyé.');
  } catch (err) {
    console.error('[AJOUT CLUB] Erreur :', err);
    res.status(500).send('Erreur serveur');
  }
});

app.get('/club-dashboard.html', isAuthenticated, isClub, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'club-dashboard.html'));
});
  
app.get('/ajouter-evenement.html', isAuthenticated, isClub, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ajouter-evenement.html'));
});
  
app.get('/api/clubs', async (req, res) => {
  try {
    const [results] = await db.query('SELECT email FROM users WHERE role = "club"');
    res.json(results);
  } catch (err) {
    console.error('[API CLUBS] Erreur :', err);
    res.status(500).json([]);
  }
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
