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
    let selectedDate = null;
  
    // Date actuelle pour l'affichage du calendrier
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
  
    function generateCalendar(month, year) {
      calendar.innerHTML = '';
  
      // Mise à jour de l'en-tête avec le mois et l'année
      const options = { month: 'long', year: 'numeric' };
      const dateForHeader = new Date(year, month);
      monthYear.textContent = dateForHeader.toLocaleDateString('fr-FR', options);
  
      // Création des en-têtes de jours (Dim, Lun, Mar, etc.)
      const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      dayNames.forEach(dayName => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.textContent = dayName;
        calendar.appendChild(dayHeader);
      });
  
      // Déterminer le jour de la semaine du 1er jour du mois
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();
  
      // Remplir les cases vides avant le premier jour
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
  
        // Ajouter les événements s'il y en a pour ce jour
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
  
        // Au clic, afficher le formulaire pré-rempli avec la date sélectionnée
        dayCell.addEventListener('click', (e) => {
          // Éviter d’ouvrir le formulaire si l’on clique sur un événement
          if(e.target.classList.contains('event')) return;
          selectedDate = new Date(year, month, day);
          const yyyy = selectedDate.getFullYear();
          const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
          const dd = String(selectedDate.getDate()).padStart(2, '0');
          eventDatetime.value = `${yyyy}-${mm}-${dd}T00:00`;
          eventForm.style.display = 'block';
        });
  
        calendar.appendChild(dayCell);
      }
    }
  
    function addEvent() {
      const title = eventTitle.value.trim();
      const description = eventDescription.value.trim();
      const datetime = eventDatetime.value;
  
      if (title && description && datetime) {
        events.push({ title, description, datetime });
        // Régénérer le calendrier pour afficher le nouvel événement
        generateCalendar(currentMonth, currentYear);
        // Réinitialiser le formulaire et le masquer
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
  
    // Générer le calendrier lors du chargement de la page
    generateCalendar(currentMonth, currentYear);
  });
  
  //maj