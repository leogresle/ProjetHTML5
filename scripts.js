document.addEventListener("DOMContentLoaded", function() {
    // Cibler le lien Calendrier
    document.getElementById("calendrier-link").addEventListener("click", function(event) {
        event.preventDefault(); // Empêche la navigation vers l'URL

        // Modifier le contenu de la section #welcome-hero
        const welcomeHero = document.getElementById("welcome-hero");
        alert("test");
        // Nouveau contenu à injecter dans la section
        welcomeHero.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div class="header-text">
                            <h2>Calendrier des événements</h2>
                            <p>Aucun événement prévu pour le moment.</p>
                            <a href="?a=acceuil">Retour à l'accueil</a>
                        </div><!--/.header-text-->
                    </div><!--/.col-->
                </div><!-- /.row-->
            </div><!-- /.container-->
        `;
    });
});
