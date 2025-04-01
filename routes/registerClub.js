const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const SECRET_KEY = "super_secret_key"; // Clé pour vérifier le token

router.post('/register-club', (req, res) => {
    const { token, password } = req.body;

    try {
        // Vérifier le token JWT
        const decoded = jwt.verify(token, SECRET_KEY);
        const email = decoded.email;

        // Hasher le mot de passe
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });

            // Mettre à jour l'utilisateur avec son mot de passe sécurisé
            const query = "UPDATE users SET password = ? WHERE email = ?";
            db.execute(query, [hashedPassword, email], (err, results) => {
                if (err) return res.status(500).json({ message: "Erreur lors de la mise à jour" });

                res.status(200).json({ message: "Mot de passe défini avec succès" });
            });
        });
    } catch (err) {
        return res.status(400).json({ message: "Lien invalide ou expiré" });
    }
});

module.exports = router;
