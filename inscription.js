document.addEventListener('DOMContentLoaded', function() {
    // Vérifie si l'élément "signup-form" existe avant d'ajouter l'événement
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêcher l'envoi du formulaire par défaut
            
            // Récupérer les données du formulaire
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Créer l'objet de données à envoyer
            const data = {
                username: username,
                email: email,
                password: password
            };

            // Envoyer les données via fetch (requête POST)
            fetch('http://localhost:3000/api/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Inscription réussie.') {
                    alert('Inscription réussie !');
                    // Rediriger ou afficher un message de succès
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
        console.error("Le formulaire d'inscription n'a pas été trouvé.");
    }
});
