document.getElementById("invite-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire par défaut

    // Récupère la valeur de l'email saisi par l'utilisateur
    const email = document.getElementById("club-email").value;

    // Récupère le token JWT depuis le localStorage pour authentifier l'admin
    const token = localStorage.getItem("token");

    // Si le token est absent, renvoyer une erreur
    if (!token) {
        document.getElementById("message").textContent = "Erreur: Vous devez être connecté.";
        return;
    }

    // Envoie une requête POST à l'API backend pour inviter un club
    fetch("http://localhost:3000/api/invite", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`, // Envoie le token dans l'en-tête pour authentification
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }) // Envoie l'email du club dans le corps de la requête
    })
    .then(response => response.json()) // Traite la réponse en JSON
    .then(data => {
        document.getElementById("message").textContent = data.message; // Affiche le message de la réponse du serveur
    })
    .catch(error => {
        console.error("Erreur :", error); // Logue l'erreur dans la console si un problème se produit
        document.getElementById("message").textContent = "Erreur lors de l'envoi de l'invitation.";
    });
});
