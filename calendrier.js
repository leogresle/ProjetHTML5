document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const eventForm = document.getElementById('event-form');
    const eventTitle = document.getElementById('event-title');
    const eventDescription = document.getElementById('event-description');
    const eventDatetime = document.getElementById('event-datetime');
    const addEventButton = document.getElementById('add-event');

    // Fonction pour générer le calendrier
    function generateCalendar() {
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDayOfMonth.getDate();
        const firstDay = firstDayOfMonth.getDay();

        // Afficher les jours de la semaine
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            calendar.appendChild(dayElement);
        });

        // Remplir les cases vides avant le premier jour du mois
        for (let i = 0; i < firstDay; i++) {
            const emptyElement = document.createElement('div');
            calendar.appendChild(emptyElement);
        }

        // Remplir les jours du mois
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.addEventListener('click', () => {
                // Afficher le formulaire d'événement pour le jour sélectionné
                eventForm.style.display = 'block';
                eventDatetime.value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00`;
            });
            calendar.appendChild(dayElement);
        }
    }

    // Fonction pour ajouter un événement
    function addEvent() {
        const title = eventTitle.value;
        const description = eventDescription.value;
        const datetime = eventDatetime.value;

        if (title && description && datetime) {
            const event = { title, description, datetime };
            // Enregistrer l'événement (par exemple, dans le localStorage ou une base de données)
            console.log('Événement ajouté:', event);
            // Réinitialiser le formulaire
            eventTitle.value = '';
            eventDescription.value = '';
            eventDatetime.value = '';
            eventForm.style.display = 'none';
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    }

    // Écouter le clic sur le bouton d'ajout d'événement
    addEventButton.addEventListener('click', addEvent);

    // Générer le calendrier au chargement de la page
    generateCalendar();
});
