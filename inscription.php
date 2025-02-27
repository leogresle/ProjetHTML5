<?php
// Lien à la base de données
require_once 'database.php';  // Assure-toi que ce fichier existe pour gérer la connexion à la base de données.

session_start();  // Démarrer la session pour gérer les utilisateurs connectés (si besoin).

$error = '';  // Variable pour les messages d'erreur.

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Récupérer les données du formulaire
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    // Valider les données de base (tu peux rajouter plus de validation côté client et serveur)
    if (empty($username) || empty($password) || empty($email)) {
        $error = "Tous les champs doivent être remplis.";
    } else {
        try {
            // Vérifier si l'utilisateur existe déjà
            $sql = "SELECT * FROM user WHERE username = :username OR email = :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $error = "Ce nom d'utilisateur ou cet email est déjà pris.";
            } else {
                // Hachage du mot de passe avant insertion
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                // Insérer l'utilisateur dans la base de données
                $sql = "INSERT INTO user (username, password, email) VALUES (:username, :password, :email)";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':password', $hashed_password);
                $stmt->bindParam(':email', $email);
                $stmt->execute();

                echo "Inscription réussie ! Vous pouvez maintenant vous connecter.";
                header("Location: connexion.php");  // Rediriger vers la page de connexion après inscription réussie
                exit();
            }
        } catch (PDOException $e) {
            $error = "Erreur d'inscription : " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
</head>
<body>
    <h2>Inscription</h2>

    <!-- Afficher un message d'erreur si nécessaire -->
    <?php
    if (!empty($error)) {
        echo "<p style='color: red;'>$error</p>";
    }
    ?>

    <!-- Formulaire d'inscription -->
    <form action="inscription.php" method="POST">
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" name="username" required><br><br>
        
        <label for="email">Email :</label>
        <input type="email" id="email" name="email" required><br><br>
        
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" required><br><br>
        
        <button type="submit">S'inscrire</button>
    </form>

    <p>Vous avez déjà un compte ? <a href="connexion.php">Se connecter</a></p>
</body>
</html>
