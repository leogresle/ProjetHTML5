document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  const monthYear = document.getElementById('month-year');
  const filterOptions = document.getElementById('filter-options');

  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectedClubs = new Set();
  let currentEventId = null;

  async function fetchEventsWithColors() {
    try {
      const response = await fetch('/api/events-with-colors');
      if (!response.ok) {
        // Affiche la réponse de l'API dans la console si elle est incorrecte
        const errorData = await response.json();
        console.error('Erreur lors du chargement des événements:', errorData);
        throw new Error('Erreur lors du chargement des événements');
      }
      const events = await response.json();
      return events;
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      return []; // Retourne un tableau vide si l'API échoue
    }
  }
  

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

  async function generateCalendar(month, year) {
    calendar.innerHTML = '';

    const options = { month: 'long', year: 'numeric' };
    monthYear.textContent = new Date(year, month).toLocaleDateString('fr-FR', options);

    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    dayNames.forEach(dayName => {
      const dayHeader = document.createElement('div');
      dayHeader.classList.add('day-header');
      dayHeader.textContent = dayName;
      calendar.appendChild(dayHeader);
    });

    const events = await fetchEventsWithColors();
    const filteredEvents = selectedClubs.size > 0
      ? events.filter(ev => selectedClubs.has(ev.club_name) && ev.is_visible)
      : events.filter(ev => ev.is_visible);

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('day');
      calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDate; day++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('day');
      dayCell.setAttribute('data-day', day);

      const dayNumber = document.createElement('div');
      dayNumber.classList.add('day-number');
      dayNumber.textContent = day;
      dayCell.appendChild(dayNumber);

      const dayEvents = filteredEvents.filter(ev => {
        const evDate = new Date(ev.date);
        return evDate.getDate() === day && evDate.getMonth() === month && evDate.getFullYear() === year;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));

      dayEvents.forEach(ev => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.style.backgroundColor = ev.color;

        const eventTime = new Date(ev.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        eventDiv.innerHTML = `<strong>${ev.title}</strong><br>${eventTime}<br>${ev.description}`;
        dayCell.appendChild(eventDiv);

        eventDiv.addEventListener('click', () => {
          currentEventId = ev.id; // Stocker l'ID de l'événement actuel
          openEventModal(ev);
        });
      });

      calendar.appendChild(dayCell);
    }
  }

  async function generateFilterOptions() {
    const clubs = await fetchClubs();
    filterOptions.innerHTML = '';

    clubs.forEach(club => {
      const filterOption = document.createElement('div');
      filterOption.classList.add('filter-option');
      filterOption.innerHTML = `
        <input type="checkbox" id="club-${club.name}" value="${club.name}">
        <label for="club-${club.name}">${club.name}</label>
      `;
      filterOptions.appendChild(filterOption);

      filterOption.querySelector('input').addEventListener('change', event => {
        if (event.target.checked) {
          selectedClubs.add(club.name);
        } else {
          selectedClubs.delete(club.name);
        }
        generateCalendar(currentMonth, currentYear);
      });
    });
  }

  function openEventModal(event) {
    document.getElementById('eventTitle').innerText = event.title;
    document.getElementById('eventClub').innerText = event.club_name;
    document.getElementById('eventDate').innerText = new Date(event.date).toLocaleDateString('fr-FR');
    document.getElementById('eventTime').innerText = new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('eventLocation').innerText = event.location;
    document.getElementById('eventDescription').innerText = event.description;
    document.getElementById('eventModal').style.display = 'block';

    // Générer le lien pour ajouter à Google Agenda
    const googleCalendarLink = generateGoogleCalendarLink(event);
    document.getElementById('addToGoogleCalendar').onclick = () => window.open(googleCalendarLink, '_blank');

    // Vérifier si l'utilisateur a déjà liké cet événement
    const likedEvents = JSON.parse(localStorage.getItem('likedEvents')) || [];
    const likeButton = document.getElementById('likeButton');
    if (likedEvents.includes(event.id)) {
      likeButton.textContent = 'Unlike';
      likeButton.classList.add('unliked');
    } else {
      likeButton.textContent = 'Like';
      likeButton.classList.remove('unliked');
    }
  }
  function closeEventModal() {
    document.getElementById('eventModal').style.display = 'none';
  }

  function generateGoogleCalendarLink(event) {
    // Utiliser la date de l'événement
    const startDate = new Date(event.date);
    const endDate = new Date(new Date(event.date).getTime() + 60 * 60 * 1000); // 1 heure après le début (arbitraire)

    // Fonction pour formater la date en YYYYMMDDTHHmmssZ
    function formatDate(date) {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    const startTime = formatDate(startDate);
    const endTime = formatDate(endDate);

    const title = encodeURIComponent(event.title);
    const description = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.location);

    return `https://www.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${description}&location=${location}`;
  }

  document.querySelector('.close').addEventListener('click', closeEventModal);

  window.addEventListener('click', (event) => {
    if (event.target == document.getElementById('eventModal')) {
      closeEventModal();
    }
  });

  document.getElementById('likeButton').addEventListener('click', () => {
    const eventId = currentEventId; // Assurez-vous que currentEventId est défini

    // Vérifier si l'utilisateur a déjà liké cet événement
    const likedEvents = JSON.parse(localStorage.getItem('likedEvents')) || [];
    const isLiked = likedEvents.includes(eventId);

    const likeButton = document.getElementById('likeButton');

    if (isLiked) {
      // Retirer le like
      const updatedLikedEvents = likedEvents.filter(id => id !== eventId);
      localStorage.setItem('likedEvents', JSON.stringify(updatedLikedEvents));

      // Envoyer une requête au serveur pour décrémenter le nombre de likes
      fetch(`/api/events/${eventId}/unlike`, {
        method: 'POST',
      }).then(response => {
        if (response.ok) {
          // Changer le texte et la couleur du bouton pour indiquer que l'événement a été unliké
          likeButton.textContent = 'Like';
          likeButton.classList.remove('unliked');
        } else {
          console.error('Erreur lors de la mise à jour du unlike.');
        }
      }).catch(error => console.error('Erreur lors de la mise à jour du unlike:', error));
    } else {
      // Ajouter le like
      likedEvents.push(eventId);
      localStorage.setItem('likedEvents', JSON.stringify(likedEvents));
      // Envoyer une requête au serveur pour incrémenter le nombre de likes
      fetch(`/api/events/${eventId}/like`, {
        method: 'POST',
      }).then(response => {
        if (response.ok) {
          // Changer le texte et la couleur du bouton pour indiquer que l'événement a été liké
          likeButton.textContent = 'Unlike';
          likeButton.classList.add('unliked');
        } else {
          console.error('Erreur lors de la mise à jour du like.');
        }
      }).catch(error => console.error('Erreur lors de la mise à jour du like:', error));
    }
  });
  
  
  function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    } else if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
  }

  prevMonthButton.addEventListener('click', () => changeMonth(-1));
  nextMonthButton.addEventListener('click', () => changeMonth(1));

  generateCalendar(currentMonth, currentYear);
  generateFilterOptions();
});
