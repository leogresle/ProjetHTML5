document.addEventListener('DOMContentLoaded', () => {
  const eventTitle = document.getElementById('event-title');
  const eventDescription = document.getElementById('event-description');
  const eventDatetime = document.getElementById('event-datetime');
  const eventLocation = document.getElementById('event-location');
  const addEventButton = document.getElementById('add-event');
  const clubOptions = document.getElementById('club-options');

  let selectedClub = '';

  async function fetchClubs() {
    try {
      const response = await fetch('/api/clubs');
      if (!response.ok) throw new Error('Erreur lors du chargement des clubs');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function generateClubOptions() {
    const clubs = await fetchClubs();
    clubOptions.innerHTML = '';

    clubs.forEach(club => {
      const option = document.createElement('div');
      option.classList.add('club-option');
      option.innerHTML = `
        <input type="radio" id="club-${club.name}" name="club" value="${club.name}">
        <label for="club-${club.name}">${club.name}</label>
      `;
      clubOptions.appendChild(option);

      option.querySelector('input').addEventListener('change', event => {
        if (event.target.checked) {
          selectedClub = club.name;
        }
      });
    });
  }

  if (addEventButton) {
    addEventButton.addEventListener('click', async () => {
      const title = eventTitle.value.trim();
      const description = eventDescription.value.trim();
      const datetime = eventDatetime.value;
      const location = eventLocation.value.trim();

      if (title && description && datetime && location && selectedClub) {
        const newEvent = { title, description, datetime, location, club: selectedClub };

        try {
          const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
          });

          if (!response.ok) throw new Error("Erreur lors de l'ajout de l'événement");

          alert("Événement ajouté !");

          // Réinitialiser les champs de texte après l'ajout réussi de l'événement
          eventTitle.value = '';
          eventDescription.value = '';
          eventDatetime.value = '';
          eventLocation.value = '';

        } catch (error) {
          console.error(error);
          alert("Impossible d'ajouter l'événement.");
        }
      } else {
        alert('Veuillez remplir tous les champs et sélectionner un club.');
      }
    });
  }

  generateClubOptions();
});
