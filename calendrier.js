document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  const monthYear = document.getElementById('month-year');
  const eventForm = document.getElementById('event-form');
  const eventTitle = document.getElementById('event-title');
  const eventDescription = document.getElementById('event-description');
  const eventDatetime = document.getElementById('event-datetime');
  const addEventButton = document.getElementById('add-event');
  const closeFormButton = document.getElementById('close-form');

  let events = [];

  // Date actuelle pour l'affichage du calendrier
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // Génération du calendrier pour le mois et l'année donnés
  function generateCalendar(month, year) {
    calendar.innerHTML = '';

    // Affichage de l'en-tête (mois et année)
    const options = { month: 'long', year: 'numeric' };
    const dateForHeader = new Date(year, month);
    monthYear.textContent = dateForHeader.toLocaleDateString('fr-FR', options);

    // Création des en-têtes de jours (Dim, Lun, Mar, ...)
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    dayNames.forEach(dayName => {
      const dayHeader = document.createElement('div');
      dayHeader.classList.add('day-header');
      dayHeader.textContent = dayName;
      calendar.appendChild(dayHeader);
    });

    // Calcul du jour de la semaine du 1er jour du mois et du nombre de jours dans le mois
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Cases vides avant le premier jour du mois
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('day');
      calendar.appendChild(emptyCell);
    }

    // Création des cellules pour chaque jour
    for (let day = 1; day <= lastDate; day++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('day');
      dayCell.setAttribute('data-day', day);

      // Affichage du numéro du jour
      const dayNumber = document.createElement('div');
      dayNumber.classList.add('day-number');
      dayNumber.textContent = day;
      dayCell.appendChild(dayNumber);

      // Ajout des événements pour ce jour, s'il y en a
      const dayEvents = events.filter(ev => {
        const evDate = new Date(ev.datetime);
        return evDate.getDate() === day &&
               evDate.getMonth() === month &&
               evDate.getFullYear() === year;
      });
      dayEvents.forEach(ev => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        // Affichage du titre, de l'heure et de la description
        const time = ev.datetime.split('T')[1];
        eventDiv.innerHTML = `<strong>${ev.title}</strong><br>${time}<br>${ev.description}`;
        dayCell.appendChild(eventDiv);
      });

      // Au clic sur une cellule (en évitant les clics sur un événement déjà affiché), afficher le formulaire pré-rempli avec la date sélectionnée
      dayCell.addEventListener('click', (e) => {
        if(e.target.classList.contains('event')) return;
        const selectedDate = new Date(year, month, day);
        const yyyy = selectedDate.getFullYear();
        const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const dd = String(selectedDate.getDate()).padStart(2, '0');
        eventDatetime.value = `${yyyy}-${mm}-${dd}T00:00`;
        eventForm.style.display = 'block';
      });

      calendar.appendChild(dayCell);
    }
  }

  // Fonction pour ajouter un événement
  function addEvent() {
    const title = eventTitle.value.trim();
    const description = eventDescription.value.trim();
    const datetime = eventDatetime.value;

    if (title && description && datetime) {
      events.push({ title, description, datetime });
      generateCalendar(currentMonth, currentYear);
      // Réinitialiser et masquer le formulaire
      eventTitle.value = '';
      eventDescription.value = '';
      eventDatetime.value = '';
      eventForm.style.display = 'none';
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }

  addEventButton.addEventListener('click', addEvent);
  closeFormButton.addEventListener('click', () => {
    eventForm.style.display = 'none';
  });

  // Générer le calendrier au chargement de la page
  generateCalendar(currentMonth, currentYear);
});
