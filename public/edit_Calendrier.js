document.addEventListener('DOMContentLoaded', () => {
    const eventTitle = document.getElementById('event-title');
    const eventDescription = document.getElementById('event-description');
    const eventDatetime = document.getElementById('event-datetime');
    const addEventButton = document.getElementById('add-event');

    if (addEventButton) {
        addEventButton.addEventListener('click', async () => {
            const title = eventTitle.value.trim();
            const description = eventDescription.value.trim();
            const datetime = eventDatetime.value;

            if (title && description && datetime) {
                const newEvent = { title, description, datetime };

                try {
                    const response = await fetch('/api/events', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newEvent)
                    });

                    if (!response.ok) throw new Error("Erreur lors de l'ajout de l'événement");

                    alert(" Événement ajouté !");
                    ///window.location.href = 'Calendier.html'; // Redirection après ajout
                    window.location.href = '/accueil';




                } catch (error) {
                    console.error(error);
                    alert(" Impossible d'ajouter l'événement.");
                }
            } else {
                alert(' Veuillez remplir tous les champs.');
            }
        });
    }
});
