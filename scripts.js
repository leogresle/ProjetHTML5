const events = [];
const eventFormModal = document.getElementById('event-form');
const eventsContainer = document.getElementById('events-container');
const searchInput = document.getElementById('search-input');
const addEventForm = document.getElementById('add-event-form');
const closeFormBtn = document.getElementById('close-form');
const loginBtn = document.getElementById('login-btn');

// Afficher ou masquer le formulaire d'ajout d'événement
loginBtn.addEventListener('click', () => {
    // Simulation de connexion (à adapter pour authentification réelle)
    alert('Vous êtes connecté en tant que Club!');
    eventFormModal.style.display = 'flex';
});

closeFormBtn.addEventListener('click', () => {
    eventFormModal.style.display = 'none';
});

// Ajouter un événement
addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('event-title').value;
    const description = document.getElementById('event-description').value;
    const date = document.getElementById('event-date').value;

    if (title && description && date) {
        const event = {
            title,
            description,
            date
        };
        events.push(event);
        displayEvents();
        eventFormModal.style.display = 'none';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Afficher les événements
function displayEvents() {
    eventsContainer.innerHTML = '';
    const filteredEvents = events.filter(event => event.title.toLowerCase().includes(searchInput.value.toLowerCase()));

    filteredEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><strong>Date:</strong> ${event.date}</p>
        `;
        eventsContainer.appendChild(eventDiv);
    });
}

// Filtrer les événements par recherche
searchInput.addEventListener('input', displayEvents);
