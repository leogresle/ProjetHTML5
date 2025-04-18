const myEventsContainer = document.getElementById('my-events-container');

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
    if (!response.ok) throw new Error('Erreur lors de la mise à jour de la visibilité');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function displayEvents(events) {
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
  myEventsContainer.innerHTML = '';

  if (events.length === 0) {
    myEventsContainer.innerHTML = '<p>Aucun événement trouvé pour votre club.</p>';
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
      <div class="event-actions">
        <button class="delete-button" data-event-id="${event.id}">Supprimer</button>
        <button class="toggle-visibility-button ${event.is_visible ? 'show' : 'hide'}" data-event-id="${event.id}">
          ${event.is_visible ? 'Cacher' : 'Afficher'}
        </button>
      </div>
      <div class="like-count">Likes: <span class="like-number">${event.likes || 0}</span></div>
    `;
    myEventsContainer.appendChild(eventDiv);
  });

  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', async event => {
      const eventId = event.target.getAttribute('data-event-id');
      const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet événement ?');
      if (confirmDelete) {
        const success = await deleteEvent(eventId);
        if (success) {
          alert('Événement supprimé avec succès !');
          fetchMyClubEvents();
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
        fetchMyClubEvents();
      } else {
        alert('Erreur lors de la mise à jour de la visibilité.');
      }
    });
  });
}

async function fetchMyClubEvents() {
  try {
    const response = await fetch('/api/my-events');
    if (!response.ok) throw new Error('Erreur lors du chargement des événements');
    const events = await response.json();
    displayEvents(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements du club connecté:', error);
    alert('Impossible de charger les événements de votre club.');
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  const eventTitle = document.getElementById('event-title');
  const eventDescription = document.getElementById('event-description');
  const eventDatetime = document.getElementById('event-datetime');
  const eventLocation = document.getElementById('event-location');
  const eventVisible = document.getElementById('event-visible');
  const addEventButton = document.getElementById('add-event');
  const clubColorInput = document.getElementById('club-color');
  const saveColorButton = document.getElementById('save-color');
  const clubDescription = document.getElementById('club-description');
  const saveDescriptionButton = document.getElementById('save-description');

  async function fetchClubData() {
    try {
      const response = await fetch('/api/club/me');
      if (!response.ok) throw new Error('Erreur lors de la récupération des données du club');
      const clubData = await response.json();

      // Mettre à jour les champs de description et de couleur
      clubDescription.value = clubData.description || '';
      clubColorInput.value = clubData.color || '#ffffff';
    } catch (error) {
      console.error('Erreur lors de la récupération des données du club:', error);
    }
  }

  async function saveClubDescription(description) {
    try {
      const response = await fetch('/api/club/description', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de la description');
      alert('Description mise à jour avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la mise à jour de la description du club.');
    }
  }

  async function saveClubColor(color) {
    try {
      const response = await fetch('/api/club/color', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color }),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de la couleur');
      alert('Couleur mise à jour avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la mise à jour de la couleur du club.');
    }
  }

  if (addEventButton) {
    addEventButton.addEventListener('click', async () => {
      const title = eventTitle.value.trim();
      const description = eventDescription.value.trim();
      const datetime = eventDatetime.value;
      const location = eventLocation.value.trim();
      const isVisible = eventVisible.checked;

      if (title && description && datetime && location) {
        const newEvent = {
          title,
          description,
          datetime,
          location,
          is_visible: isVisible
        };

        try {
          const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
          });

          if (!response.ok) throw new Error("Erreur lors de l'ajout de l'événement");

          alert('Événement ajouté !');
          eventTitle.value = '';
          eventDescription.value = '';
          eventDatetime.value = '';
          eventLocation.value = '';
          eventVisible.checked = true;
          fetchMyClubEvents();
        } catch (error) {
          console.error(error);
          alert("Impossible d'ajouter l'événement.");
        }
      } else {
        alert('Veuillez remplir tous les champs.');
      }
    });
  }

  saveDescriptionButton.addEventListener('click', () => {
    const description = clubDescription.value.trim();
    if (description) {
      saveClubDescription(description);
    } else {
      alert('Veuillez entrer une description.');
    }
  });

  saveColorButton.addEventListener('click', () => {
    const color = clubColorInput.value.trim();
    if (color) {
      saveClubColor(color);
    } else {
      alert('Veuillez choisir une couleur.');
    }
  });

  // Initial load
  fetchClubData();
  fetchMyClubEvents();
});