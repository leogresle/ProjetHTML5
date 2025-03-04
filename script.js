// Fonction pour vider le contenu des sections
function clearSections() {
    // Vider les sections en mettant leur contenu à vide
    document.getElementById('welcome-hero').innerHTML = '';
    document.getElementById('about').innerHTML = '';
    document.getElementById('contact').innerHTML = '';
}

// Fonction pour charger le contenu dynamique (exemple avec du contenu vide pour l'instant)
function loadCalendrier() {
    // Vider les sections d'abord
    clearSections();
    
    // Créer un nouvel élément à insérer dans chaque section si nécessaire (pour l'instant vide)
    const emptyContent = '<p>Contenu vide pour cette section.</p>';
    
    // Insérer le contenu vide dans chaque section
    document.getElementById('welcome-hero').innerHTML = emptyContent;
    document.getElementById('about').innerHTML = emptyContent;
    document.getElementById('contact').innerHTML = emptyContent;
}

// Ajouter l'écouteur d'événements sur le lien Calendrier
document.addEventListener('DOMContentLoaded', function () {
    const calendrierLink = document.querySelector('a[href="?a=calendrier"]');
    if (calendrierLink) {
        calendrierLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêche le comportement par défaut du lien
            console.log("Lien Calendrier cliqué");
            loadCalendrier();    // Appelle la fonction pour vider les sections
        });
    }
    const testButton = document.getElementById('testButton');
    if (testButton) {
        testButton.addEventListener('click', function () {
            alert("Button clicked");
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const testButton = document.getElementById('testButton');
    if (testButton) {
        testButton.addEventListener('click', function () {
            alert("Button clicked");
        });
    }
});


