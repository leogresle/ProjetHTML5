const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Connexion MySQL
const router = express.Router();

const SECRET_KEY = "super_secret_key"; // Clé pour signer les JWT

// Connexion
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.execute(query, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });

        if (results.length === 0) {
            return res.status(400).json({ message: "Utilisateur introuvable" });
        }

        const user = results[0];

        // Vérification du mot de passe
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Erreur interne" });

            if (!isMatch) {
                return res.status(400).json({ message: "Mot de passe incorrect" });
            }

            // Génération du token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                SECRET_KEY,
                { expiresIn: '24h' }
            );

            res.status(200).json({ message: "Connexion réussie", token, role: user.role });
        });
    });
});

module.exports = router;
