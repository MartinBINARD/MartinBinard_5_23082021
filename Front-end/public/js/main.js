// Message data server error
const serverError = function() {
    let mainContent = document.getElementById('main-content');
    mainContent.innerHTML = "<div class='container my-3 py-3 rounded bg-light' style='max-width: 34rem;'><div><p>Oups! Le serveur est actuellement indisponible. Veuillez lancer le serveur local (Port 3000) avec les commandes 'npm install' puis 'node server.js'.</p></div></div>";
    mainContent.classList.add("text-dark");
}