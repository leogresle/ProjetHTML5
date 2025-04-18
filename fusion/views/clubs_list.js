// Fonction pour récupérer la liste des clubs
function fetchClubs() {
    fetch('/api/clubs')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayClubs(data);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

// Fonction pour afficher la liste des clubs
function displayClubs(clubs) {
    const clubsListDiv = document.getElementById('clubs-list');

    // Vérifier si la liste des clubs est vide
    if (clubs.length === 0) {
        clubsListDiv.innerHTML = '<p>Aucun club trouvé.</p>';
        return;
    }

    // Créer une liste d'éléments pour chaque club
    const ul = document.createElement('ul');
    clubs.forEach(club => {
        const li = document.createElement('li');
        li.classList.add('club-item'); // Ajouter une classe pour styliser en CSS

        // Créer un élément span pour afficher la couleur sous forme de cercle
        const colorCircle = document.createElement('span');
        colorCircle.classList.add('color-circle');
        colorCircle.style.backgroundColor = club.color; // Garder ce style inline car la couleur est dynamique

        li.innerHTML = `
            <strong>${club.name}</strong><br>
            <span>${club.description}</span><br>
            <div class="color-container">
                ${colorCircle.outerHTML}
                <span class="club-color">${club.color}</span>
            </div>
        `;

        ul.appendChild(li);
    });

    clubsListDiv.appendChild(ul);
}

// Appel de la fonction pour récupérer et afficher les clubs
fetchClubs();