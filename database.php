<?php
// Configuration de la connexion à la base de données
$host = 'localhost';
$dbname = 'user';
$username = 'root';   
$password = '';        

try {
    // Créer une instance de PDO pour se connecter à MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Configurer l'attribut de gestion des erreurs de PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie à la base de données.";
    } catch (PDOException $e) {
        echo "Erreur de connexion : " . $e->getMessage();
    }
?>
