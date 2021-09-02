// CODE APPROVED
// Message data server error
const serverError = function() {
    let mainContent = document.getElementById('main-content');
    mainContent.innerHTML = "<div><p>Oups! Le serveur est actuellement indisponible. Veuillez lancer le serveur local (Port 3000) avec les commandes 'npm install' puis 'node server.js'.</p></div>";
    mainContent.classList.add("text-white");
}

// TEST
// fetch('http://localhost:3000/api/cameras')
//     .then(res.json())
//     .then(data => photo.src = data[0].imageUrl)

// ON DEVELOPMENT
const items = document.getElementById('items')

function getItems() {
    fetch('http://localhost:3000/api/cameras')
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
          serverError();
        }
    })
    .then(datas => {
      console.log(datas)
      for (let data of datas) {
          document.getElementById('main-content').innerHTML += "<div class='col'>"+
          "<div class='card shadow-sm border-0'>"+
            "<img src='"+ data.imageUrl +"' alt='appareil photo ancien'>"+
  
            "<div class='card-body'>"+
              "<div class='card-title fs-3'>"+data.name+"</div>"+
              "<p class='card-text'>"+data.description+"</p>"+
              "<div class='d-flex justify-content-between align-items-center'>"+
                "<a href='card.html?id="+data._id+"' class='btn btn-sm btn-outline-secondary'>Voir le produit</a>"+
                "<p class='fs-4'>"+(data.price/1000)+"€</p>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>";
      }
    })
    .catch(error => alert(error));
}

getItems()