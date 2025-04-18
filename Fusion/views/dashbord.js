// script.js
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/club/me');
      if (!response.ok) throw new Error('Erreur lors de la récupération des infos du club');
  
      const data = await response.json();
      document.getElementById('club-name').innerText = data.name;
    } catch (error) {
      console.error(error);
      document.getElementById('club-name').innerText = 'Club';
    }
  });
  