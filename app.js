const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

// Créer une instance d'Express
const app = express();
const port = 3000;

// Middleware pour parser les données JSON
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Route pour l'inscription
app.post('/api/inscription', (req, res) => {
    const { username, password, email } = req.body;

    // Vérifier que les champs sont remplis
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Tous les champs doivent être remplis.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.execute(query, [username, email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la vérification de l\'utilisateur.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Ce nom d\'utilisateur ou email est déjà pris.' });
        }

        // Hacher le mot de passe
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors du hachage du mot de passe.' });
            }

            // Insérer l'utilisateur dans la base de données
            const insertQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
            db.execute(insertQuery, [username, hashedPassword, email], (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
                }
                return res.status(200).json({ message: 'Inscription réussie.' });
            });
        });
    });
});

// Route pour la connexion
app.post('/api/connexion', (req, res) => {
    const { email, password } = req.body;

    // Vérifier que l'email et le mot de passe sont fournis
    if (!email || !password) {
        return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
    }

    // Rechercher l'utilisateur dans la base de données
    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de communication avec la base de données.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifier le mot de passe
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la vérification du mot de passe.' });
            }

            if (!isMatch) {
                return res.status(400).json({ message: 'Mot de passe incorrect.' });
            }

            // Connexion réussie
            res.status(200).json({ message: 'Connexion réussie.' });
        });
    });
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
