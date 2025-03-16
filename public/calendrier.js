document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  const monthYear = document.getElementById('month-year');

  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  async function fetchEvents() {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Erreur lors du chargement des événements');
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

    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']; // Lundi en premier
    dayNames.forEach(dayName => {
      const dayHeader = document.createElement('div');
      dayHeader.classList.add('day-header');
      dayHeader.textContent = dayName;
      calendar.appendChild(dayHeader);
    });

    const events = await fetchEvents();

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Décalage pour commencer lundi
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

      const dayEvents = events.filter(ev => {
        const evDate = new Date(ev.date);
        return evDate.getDate() === day && evDate.getMonth() === month && evDate.getFullYear() === year;
      });

      dayEvents.forEach(ev => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');

        const eventTime = new Date(ev.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        eventDiv.innerHTML = `<strong>${ev.title}</strong><br>${eventTime}<br>${ev.description}`;
        dayCell.appendChild(eventDiv);
      });

      calendar.appendChild(dayCell);
    }
  }

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
});
