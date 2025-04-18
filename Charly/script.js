// Fonction pour vider les sections
function clearSections() {
    document.getElementById('welcome-hero').innerHTML = '';
    document.getElementById('about').innerHTML = '';
    document.getElementById('contact').innerHTML = '';
}

function loadPage(page) {
    // Vider les sections avant de charger le nouveau contenu
    clearSections();

    let chemin = "http://localhost:3000/" + page.toString() + ".html";

    // Charger le contenu de calendrier.html
    fetch(chemin)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de chargement du fichier calendrier.html');
            }
            return response.text();  // Convertir le fichier en texte
        })
        .then(html => {
            // Créer un élément temporaire pour analyser le HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Extraire et insérer les sections
            const welcomeHero = tempDiv.querySelector('#welcome-hero');
            const about = tempDiv.querySelector('#about');
            const contact = tempDiv.querySelector('#contact');

            if (welcomeHero) {
                document.getElementById('welcome-hero').innerHTML = welcomeHero.innerHTML;
            }
            if (about) {
                document.getElementById('about').innerHTML = about.innerHTML;
            }
            if (contact) {
                document.getElementById('contact').innerHTML = contact.innerHTML;
            }
        })
        .catch(err => {
            console.error('Erreur lors du chargement du fichier calendrier.html:', err);
        });
}


// Ajouter l'écouteur d'événements pour le lien Calendrier
document.addEventListener('DOMContentLoaded', function () {
    const calendrierLink = document.querySelector('a[href="?a=calendrier"]');
    const editLink = document.querySelector('a[href="?a=edit"]');
    const connexionLink = document.querySelector('a[href="?a=connexion"]');
    const clubsLink = document.querySelector('a[href="?a=clubs"]');
    const newsLink = document.querySelector('a[href="?a=news"]');
    if (calendrierLink) {
        calendrierLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("calender");    // Charger le calendrier lorsqu'on clique
        });
    }
    if (editLink) {
        editLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("edit");    // Charger le calendrier lorsqu'on clique
        });
    }
    if (connexionLink) {
        connexionLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("connexion");    // Charger le calendrier lorsqu'on clique
        });
    }
    if (clubsLink) {
        clubsLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("clubs");    // Charger le calendrier lorsqu'on clique
        });
    }
    if (newsLink) {
        newsLink.addEventListener('click', function (e) {
            e.preventDefault();  // Empêcher le comportement par défaut du lien
            loadPage("news");    // Charger le calendrier lorsqu'on clique
        });
    }
});


//ADD CALENDRIER MAXIME


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
  
    async function fetchEventsWithColors() {
      try {
        const response = await fetch('/api/events-with-colors');
        if (!response.ok) throw new Error('Erreur lors du chargement des événements');
        return await response.json();
      } catch (error) {
        console.error(error);
        return [];
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
  
          eventDiv.addEventListener('click', () => openEventModal(ev));
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
    }
  
    function closeEventModal() {
      document.getElementById('eventModal').style.display = 'none';
    }
  
    document.querySelector('.close').addEventListener('click', closeEventModal);
  
    window.addEventListener('click', (event) => {
      if (event.target == document.getElementById('eventModal')) {
        closeEventModal();
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
  