document.addEventListener('DOMContentLoaded', function() {
    // Vérifie si l'élément "login-form" existe avant d'ajouter l'événement
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêcher l'envoi du formulaire par défaut
            
            // Récupérer les données du formulaire
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Créer l'objet de données à envoyer
            const data = {
                email: email,
                password: password
            };

            // Envoyer les données via une requête POST AJAX
            fetch('http://localhost:3000/api/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                // Réinitialiser les messages à chaque soumission
                document.getElementById('error-message').textContent = '';
                document.getElementById('success-message').textContent = '';

                // Si la connexion réussit
                if (data.message === 'Connexion réussie.') {
                    document.getElementById('success-message').textContent = 'Connexion réussie ! Vous êtes maintenant connecté.';
                    // Rediriger l'utilisateur ou afficher un message de succès
                    setTimeout(() => {
                        window.location.href = 'mailto.html';  // Redirection après quelques secondes
                    }, 1500); // Attente de 1.5 secondes avant redirection
                } else {
                    document.getElementById('error-message').textContent = data.message;
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                document.getElementById('error-message').textContent = 'Erreur de communication avec le serveur.';
            });
        });
    } else {
        console.error("Le formulaire de connexion n'a pas été trouvé.");
    }
});
