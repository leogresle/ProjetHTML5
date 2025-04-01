document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        alert("Vous devez être connecté pour accéder à cette page !");
        window.location.href = "connexion.html";
    } else {
        // Vérification du token auprès du serveur
        fetch("http://localhost:3000/api/protected", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Session expirée !");
            }
            return response.json();
        })
        .catch(error => {
            alert("Votre session a expiré. Veuillez vous reconnecter.");
            localStorage.clear();
            window.location.href = "connexion.html";
        });
    }
});
