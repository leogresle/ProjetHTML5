document.addEventListener('DOMContentLoaded', () => {
    const eventTitle = document.getElementById('event-title');
    const eventDescription = document.getElementById('event-description');
    const eventDatetime = document.getElementById('event-datetime');
    const addEventButton = document.getElementById('add-event');

    // Vérifier si des événements existent déjà dans localStorage
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Fonction pour ajouter un événement
    if (addEventButton) {
        addEventButton.addEventListener('click', () => {
            const title = eventTitle.value.trim();
            const description = eventDescription.value.trim();
            const datetime = eventDatetime.value;

            if (title && description && datetime) {
                // Créer un nouvel événement
                const newEvent = {
                    title,
                    description,
                    datetime
                };

                // Ajouter l'événement au tableau d'événements
                events.push(newEvent);

                // Sauvegarder les événements dans localStorage
                localStorage.setItem('events', JSON.stringify(events));

                // Réinitialiser les champs du formulaire
                eventTitle.value = '';
                eventDescription.value = '';
                eventDatetime.value = '';

                // Rediriger vers le calendrier
                window.location.href = 'Calendier.html';  // Rediriger vers le calendrier
            } else {
                alert('Veuillez remplir tous les champs.');
            }
        });
    }
});
