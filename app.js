const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// Créer une instance d'Express
const app = express();
const port = 3000;

// Middleware pour parser les données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db'
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
    const query = 'SELECT * FROM user WHERE username = ? OR email = ?';
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
            const insertQuery = 'INSERT INTO user (username, password, email) VALUES (?, ?, ?)';
            db.execute(insertQuery, [username, hashedPassword, email], (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
                }
                return res.status(200).json({ message: 'Inscription réussie.' });
            });
        });
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
