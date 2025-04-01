require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
const SECRET_KEY = process.env.SECRET_KEY || "monsecret";

// Configuration de MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database"
});

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données:", err);
    } else {
        console.log("Connecté à MySQL");
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); 

// Middleware pour vérifier le token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Récupérer le token après "Bearer"

    if (!token) {
        return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token invalide" });
        }
        req.user = user; // Ajouter les infos de l'utilisateur à la requête
        next(); // Passer à la suite
    });
}

app.post("/api/invite", authenticateToken, (req, res) => {
    const { email } = req.body;
    console.log("Requête reçue pour envoyer l'invitation à:", email);  // Logue l'email reçu
    console.log("Utilisateur admin authentifié:", req.user);

    if (!email) {
        return res.status(400).json({ message: "L'email est requis." });
    }

    // Logique d'envoi de l'invitation ici (avec Nodemailer ou autre)
    sendInvitationEmail(email)
        .then(() => {
            res.status(200).json({ message: "Invitation envoyée avec succès !" });
        })
        .catch((err) => {
            console.error("Erreur d'envoi d'invitation:", err);
            res.status(500).json({ message: "Erreur lors de l'envoi de l'invitation." });
        });
});


//  Route pour définir le mot de passe après invitation
app.post("/api/set-password", async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).json({ message: "Token et mot de passe requis" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer l'utilisateur dans la BDD
        db.execute("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", 
            [decoded.email, hashedPassword, "club"], 
            (err) => {
                if (err) {
                    return res.status(500).json({ message: "Erreur d'inscription" });
                }
                res.status(200).json({ message: "Mot de passe défini avec succès" });
            }
        );
    } catch (error) {
        res.status(400).json({ message: "Token invalide ou expiré" });
    }
});

//  Route de connexion
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    db.execute("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(400).json({ message: "Mot de passe incorrect" });
            }

            const token = jwt.sign({ id: results[0].id, role: results[0].role }, SECRET_KEY, { expiresIn: "24h" });

            res.status(200).json({
                message: "Connexion réussie",
                token,
                role: results[0].role
            });
        });
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
