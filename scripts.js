document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const eventTitle = document.getElementById('event-title');
    const eventDescription = document.getElementById('event-description');
    const eventDatetime = document.getElementById('event-datetime');
    const addEventButton = document.getElementById('add-event');
    const closeFormButton = document.getElementById('close-form');

    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Si c'est le formulaire d'ajout d'événement, on gère la soumission du formulaire
    if (addEventButton) {
        addEventButton.addEventListener('click', () => {
            const title = eventTitle.value.trim();
            const description = eventDescription.value.trim();
            const datetime = eventDatetime.value;

            if (title && description && datetime) {
                // Ajout de l'événement dans le localStorage
                events.push({ title, description, datetime });
                localStorage.setItem('events', JSON.stringify(events));

                // Redirection vers le fichier calendar.html dans le dossier Clender
                window.location.href = 'Calendier.html';  // Assurez-vous que ce chemin est correct !
            } else {
                alert('Veuillez remplir tous les champs.');
            }
        });
    }

    // Code pour gérer l'affichage du calendrier (inchangé)
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    // Fonction pour générer le calendrier
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

        // Calcul du premier jour du mois et du nombre de jours dans le mois
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
                const time = ev.datetime.split('T')[1];
                eventDiv.innerHTML = `<strong>${ev.title}</strong><br>${time}<br>${ev.description}`;
                dayCell.appendChild(eventDiv);
            });

            calendar.appendChild(dayCell);
        }
    }

    // Fonction pour changer de mois
    function changeMonth(offset) {
        currentMonth += offset;

        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }

        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }

        generateCalendar(currentMonth, currentYear);
    }

    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));

    generateCalendar(currentMonth, currentYear);
});
