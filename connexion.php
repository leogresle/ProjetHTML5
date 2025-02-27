<?php
// Lien à la base de données
require_once 'database.php';  // Assure-toi que ce fichier existe pour gérer la connexion à la base de données.

session_start();  // Démarrer la session pour gérer la connexion de l'utilisateur.

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Récupérer les données du formulaire
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        // Vérifier si l'utilisateur existe
        $sql = "SELECT * FROM user WHERE username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        // Récupérer l'utilisateur
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Vérifier le mot de passe
            if (password_verify($password, $user['password'])) {
                echo "Connexion réussie!";
                // Démarrer une session pour l'utilisateur
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                header("Location: index.html");  // Rediriger vers une page protégée après connexion
                exit();  // Toujours sortir après une redirection
            } else {
                $error = "Mot de passe incorrect.";
            }
        } else {
            $error = "Nom d'utilisateur introuvable.";
        }
    } catch (PDOException $e) {
        $error = "Erreur de connexion : " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
</head>
<body>
    <h2>Connexion</h2>

    <?php
    // Afficher un message d'erreur si nécessaire
    if (isset($error)) {
        echo "<p style='color: red;'>$error</p>";
    }
    ?>

    <form action="connexion.php" method="POST">
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" name="username" required><br><br>
        
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" required><br><br>
        
        <button type="submit">Se connecter</button>
    </form>
</body>
</html>
