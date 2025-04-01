document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        alert("Vous devez être connecté pour accéder à cette page !");
        window.location.href = "connexion.html";  // Redirection vers la connexion
    } else {
        fetch("http://localhost:3000/api/protected", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => {
            if (!response.ok) throw new Error("Accès refusé !");
            return response.json();
        })
        .catch(error => {
            alert("Session expirée, reconnectez-vous.");
            localStorage.clear();
            window.location.href = "connexion.html";
        });
    }
});
