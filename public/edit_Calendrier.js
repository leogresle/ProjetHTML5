document.addEventListener('DOMContentLoaded', () => {
  const eventTitle = document.getElementById('event-title');
  const eventDescription = document.getElementById('event-description');
  const eventDatetime = document.getElementById('event-datetime');
  const eventLocation = document.getElementById('event-location');
  const eventClub = document.getElementById('event-club');
  const addEventButton = document.getElementById('add-event');

  if (addEventButton) {
    addEventButton.addEventListener('click', async () => {
      const title = eventTitle.value.trim();
      const description = eventDescription.value.trim();
      const datetime = eventDatetime.value;
      const location = eventLocation.value.trim();
      const club = eventClub.value.trim();

      if (title && description && datetime && location && club) {
        const newEvent = { title, description, datetime, location, club };

        try {
          const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
          });

          if (!response.ok) throw new Error("Erreur lors de l'ajout de l'événement");

          alert("Événement ajouté !");
          window.location.href = '/accueil';

        } catch (error) {
          console.error(error);
          alert("Impossible d'ajouter l'événement.");
        }
      } else {
        alert('Veuillez remplir tous les champs.');
      }
    });
  }
});
