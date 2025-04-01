const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('../db');
const router = express.Router();

const SECRET_KEY = "super_secret_key"; // Clé pour signer les liens d'invitation

// Transporteur SMTP pour envoyer les emails (utiliser Mailtrap, Gmail, etc.)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "test@gmail.com",
        pass: "tonmotdepasse"
    }
});

// Route pour inviter un club (accessible uniquement à l'admin)
router.post('/invite', (req, res) => {
    const { email } = req.body;

    // Génération d'un token unique pour l'invitation
    const invitationToken = jwt.sign({ email, role: "club" }, SECRET_KEY, { expiresIn: "7d" });

    const invitationLink = `http://localhost:3000/creer-mot-de-passe?token=${invitationToken}`;

    // Envoi de l'email
    const mailOptions = {
        from: "tonemail@gmail.com",
        to: email,
        subject: "Invitation à rejoindre le BDE",
        text: `Cliquez sur ce lien pour créer votre mot de passe : ${invitationLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
        }

        res.status(200).json({ message: "Invitation envoyée avec succès" });
    });
});

module.exports = router;
