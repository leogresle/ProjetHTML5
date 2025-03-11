// Fonction pour vider les sections
function clearSections() {
    document.getElementById('welcome-hero').innerHTML = '';
    document.getElementById('about').innerHTML = '';
    document.getElementById('contact').innerHTML = '';
}

function loadPage(page) {
    // Vider les sections avant de charger le nouveau contenu
    clearSections();

    let chemin = "http://localhost:3000/" + page.toString() + ".html";

    // Charger le contenu de calendrier.html
    fetch(chemin)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de chargement du fichier calendrier.html');
            }
            return response.text();  // Convertir le fichier en texte
        })
        .then(html => {
            // Créer un élément temporaire pour analyser le HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Extraire et insérer les sections
            const welcomeHero = tempDiv.querySelector('#welcome-hero');
            const about = tempDiv.querySelector('#about');
            const contact = tempDiv.querySelector('#contact');

            if (welcomeHero) {
                document.getElementById('welcome-hero').innerHTML = welcomeHero.innerHTML;
            }
            if (about) {
                document.getElementById('about').innerHTML = about.innerHTML;
            }
            if (contact) {
                document.getElementById('contact').innerHTML = contact.innerHTML;
            }
        })
        .catch(err => {
            console.error('Erreur lors du chargement du fichier calendrier.html:', err);
        });
}


// Ajouter l'écouteur d'événements pour le lien Calendrier
document.addEventListener('DOMContentLoaded', function () {
    const calendrierLink = document.querySelector('a[href="?a=calendrier"]');
    const editLink = document.querySelector('a[href="?a=edit"]');
    const connexionLink = document.querySelector('a[href="?a=connexion"]');
    const clubsLink = document.querySelector('a[href="?a=clubs"]');
    const newsLink = document.querySelector('a[href="?a=news"]');
    if (calendrierLink) {
        calendrierLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("calendrier");    // Charger le calendrier lorsqu'on clique
        });
    }
    if (editLink) {
        editLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("edit");    // Charger le calendrier lorsqu'on clique
        });
    }
    if (connexionLink) {
        connexionLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("connexion");    // Charger le calendrier lorsqu'on clique
        });
    }
    if (clubsLink) {
        clubsLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("clubs");    // Charger le calendrier lorsqu'on clique
        });
    }
    if (newsLink) {
        newsLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("news");    // Charger le calendrier lorsqu'on clique
        });
    }
});
