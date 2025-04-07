document.addEventListener('DOMContentLoaded', () => {
  const eventTitle = document.getElementById('event-title');
  const eventDescription = document.getElementById('event-description');
  const eventDatetime = document.getElementById('event-datetime');
  const eventLocation = document.getElementById('event-location');
  const eventVisible = document.getElementById('event-visible');
  const addEventButton = document.getElementById('add-event');
  const clubOptions = document.getElementById('club-options');
  const myEventsContainer = document.getElementById('my-events-container');
  const clubColorInput = document.getElementById('club-color');
  const saveColorButton = document.getElementById('save-color');

  let customizationContainer = document.getElementById('customization-container');
  if (!customizationContainer) {
    customizationContainer = document.createElement('div');
    customizationContainer.id = 'customization-container';
    customizationContainer.innerHTML = `
      <h3>Personnalisation du Club</h3>
      <label for="club-description">Description du Club :</label>
      <textarea id="club-description" rows="4" cols="50"></textarea>
      <button id="save-description">Enregistrer la Description</button>
      <div class="color-picker-container">
        <label for="club-color">Couleur du Club :</label>
        <div class="color-input-container">
          <input type="color" id="club-color" name="club-color" value="#ffffff">
          <span class="color-advice">Nous vous conseillons de prendre une couleur claire pour que la description de votre événement soit visible.</span>
        </div>
      </div>
      <button id="save-color">Enregistrer la Couleur</button>
    `;
    document.querySelector('.container').appendChild(customizationContainer);
  }

  const clubDescription = document.getElementById('club-description');
  const saveDescriptionButton = document.getElementById('save-description');

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

  async function fetchEventsByClub(clubName) {
    try {
      const response = await fetch(`/api/events?club=${clubName}`);
      if (!response.ok) throw new Error('Erreur lors du chargement des événements');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function deleteEvent(eventId) {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression de l\'événement');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function updateEventVisibility(eventId, isVisible) {
    try {
      const response = await fetch(`/api/events/${eventId}/visibility`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible }),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de la visibilité de l\'événement');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function saveClubDescription(clubName, description) {
    try {
      const response = await fetch(`/api/clubs/${clubName}/description`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de la description du club');
      alert('Description du club mise à jour avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la mise à jour de la description du club.');
    }
  }

  async function saveClubColor(clubName, color) {
    try {
      const response = await fetch(`/api/clubs/${clubName}/color`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color }),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de la couleur du club');
      alert('Couleur du club mise à jour avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la mise à jour de la couleur du club.');
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

      option.querySelector('input').addEventListener('change', async event => {
        if (event.target.checked) {
          selectedClub = club.name;
          // Charger et afficher les événements du club sélectionné
          const events = await fetchEventsByClub(selectedClub);
          displayEvents(events);

          // Charger la description actuelle du club
          clubDescription.value = club.description || '';

          // Charger la couleur actuelle du club
          clubColorInput.value = club.color || '#ffffff';
        }
      });
    });
  }

  function displayEvents(events) {
    // Trier les événements par date croissante
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    myEventsContainer.innerHTML = '';

    if (events.length === 0) {
      myEventsContainer.innerHTML = '<p>Aucun événement trouvé pour ce club.</p>';
      return;
    }

    events.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event');
      eventDiv.innerHTML = `
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${new Date(event.date).toLocaleString('fr-FR')}</p>
        <p><strong>Lieu:</strong> ${event.location}</p>
        <p>${event.description}</p>
        <button class="delete-button" data-event-id="${event.id}">Supprimer</button>
        <button class="toggle-visibility-button ${event.is_visible ? 'show' : 'hide'}" data-event-id="${event.id}">${event.is_visible ? 'Cacher' : 'Afficher'}</button>
      `;
      myEventsContainer.appendChild(eventDiv);
    });

    // Ajouter des gestionnaires d'événements pour les boutons de suppression et de visibilité
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', async event => {
        const eventId = event.target.getAttribute('data-event-id');
        const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet événement ?');
        if (confirmDelete) {
          const success = await deleteEvent(eventId);
          if (success) {
            alert('Événement supprimé avec succès !');
            // Recharger les événements après la suppression
            const events = await fetchEventsByClub(selectedClub);
            displayEvents(events);
          } else {
            alert('Erreur lors de la suppression de l\'événement.');
          }
        }
      });
    });

    document.querySelectorAll('.toggle-visibility-button').forEach(button => {
      button.addEventListener('click', async event => {
        const eventId = event.target.getAttribute('data-event-id');
        const isVisible = !event.target.textContent.includes('Cacher');
        const success = await updateEventVisibility(eventId, isVisible);
        if (success) {
          alert('Visibilité de l\'événement mise à jour avec succès !');
          // Mettre à jour le texte et la classe du bouton
          event.target.textContent = isVisible ? 'Cacher' : 'Afficher';
          event.target.classList.toggle('show', isVisible);
          event.target.classList.toggle('hide', !isVisible);
        } else {
          alert('Erreur lors de la mise à jour de la visibilité de l\'événement.');
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
      const isVisible = eventVisible.checked;

      if (title && description && datetime && location && selectedClub) {
        const newEvent = { title, description, datetime, location, club: selectedClub, is_visible: isVisible };

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
          eventVisible.checked = true; // Réinitialiser la case à cocher

          // Mettre à jour la liste des événements
          const events = await fetchEventsByClub(selectedClub);
          displayEvents(events);

        } catch (error) {
          console.error(error);
          alert("Impossible d'ajouter l'événement.");
        }
      } else {
        alert('Veuillez remplir tous les champs et sélectionner un club.');
      }
    });
  }

  // Ajouter un gestionnaire d'événements pour le bouton d'enregistrement de la description
  saveDescriptionButton.addEventListener('click', () => {
    const description = clubDescription.value.trim();
    if (description && selectedClub) {
      saveClubDescription(selectedClub, description);
    } else {
      alert('Veuillez entrer une description pour le club et sélectionner un club.');
    }
  });

  // Ajouter un gestionnaire d'événements pour le bouton d'enregistrement de la couleur
  saveColorButton.addEventListener('click', () => {
    const color = clubColorInput.value.trim();
    if (color && selectedClub) {
      saveClubColor(selectedClub, color);
    } else {
      alert('Veuillez choisir une couleur pour le club et sélectionner un club.');
    }
  });

  generateClubOptions();
});
