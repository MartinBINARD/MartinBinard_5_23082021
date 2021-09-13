// Display whole items
getItems();

function getItems() {
    fetch('http://localhost:3000/api/cameras')
    .then(response => {
      if(response.ok) {return response.json();}})
    .then(datas => {
      // console.log(datas)
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
    .catch(() => serverError());
}