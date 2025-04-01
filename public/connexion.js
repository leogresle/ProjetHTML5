document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Connexion réussie") {
                    localStorage.setItem("token", data.token);  // Stocker le token
                    localStorage.setItem("role", data.role);  // Stocker le rôle

                    document.getElementById('success-message').textContent = "Connexion réussie !";

                    // Redirection en fonction du rôle
                    setTimeout(() => {
                        if (data.role === "admin") {
                            window.location.href = "admin.html";  // Page de l'admin
                        } else {
                            window.location.href = "dashboard.html";  // Page des clubs
                        }
                    }, 1500);
                } else {
                    document.getElementById('error-message').textContent = data.message;
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
                document.getElementById('error-message').textContent = "Erreur de communication avec le serveur.";
            });
        });
    }
});
