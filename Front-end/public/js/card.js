// Notify the loss of server connexion

const serverError = function() {
    let cardContent = document.getElementById('card-content');
    cardContent.innerHTML = "<div><p>Oups! Le serveur est actuellement indisponible. Veuillez lancer le serveur local (Port 3000) avec les commandes 'npm install' puis 'node server.js'.</p></div>";
    cardContent.classList.add("text-dark");
}

// Display the item carateristic

function getCardItem () {
    // console.log(window.location.search);
    const URLend = new URLSearchParams(window.location.search);
    // console.log(URLend);
    const id = URLend.get("id");
    // console.log(id);

    const URL = "http://localhost:3000/api/cameras/"+id;
    fetch(URL)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            serverError();
        }
    })
    .then(datas => {
        // console.log(datas.lenses)
        document.getElementById("card-content").innerHTML = 
        "<div class='text-center'>"+
            "<img class='img-fluid rounded' src='"+datas.imageUrl+"' alt='appareil photo années 60'>"+
        "</div>"+
        "<div class='card-body mx-3'>"+
            "<div class='d-flex justify-content-between align-items-center'>"+
              "<div class='card-title fs-3'>"+datas.name+"</div>"+
              "<div class='card-title pricing-card-title fs-4'>"+(datas.price/1000)+"€</div>"+
            "</div>"+
        "<div class='row mx-3'>"+
            "<p class='card-text'>"+datas.description+"</p>"+
            "<select class='form-select mt-3 my-3' aria-label='Default select example' id='options-list'>"+
            "</select>"+
            "<p class='small-text my-2'>Quantité:</p>"+
            "<select class='form-select' aria-label='Default select example'>"+
                "<option value='1'>1</option>"+
                "<option value='2'>2</option>"+
                "<option value='3'>3</option>"+
                "<option value='4'>4</option>"+
                "<option value='5'>5</option>"+
            "</select>"+
        "</div>"+
        "<div class='d-flex align-items-center my-3'>"+
            "<button type='button' class='btn btn-sm btn-outline-secondary ms-3' id='button'>Ajouter au panier</button>"+
            "<a href='cart.html' class='btn btn-sm btn-outline-secondary ms-3'>Commander</a>"+
        "</div>";
        // Loop display item options
        const itemLenses = datas.lenses;
        // console.log(itemLenses)
        for(let lense of itemLenses) {
            document.getElementById('options-list').innerHTML += "<option value='"+lense+"'>"+lense+"</option>";
        }

        // Add to cart listener button
        const buttonAddToCart = document.getElementById('button');

        buttonAddToCart.addEventListener('click', (e) => {
            e.preventDefault();
            // Store option selected
            const optionChoice = document.getElementById('options-list').value;
            console.log(optionChoice);
            
            // Get item values selected
            let itemValues = {
                itemName : datas.name,
                itemId : datas._id,
                itemOptions : optionChoice,
                itemQuantity : 1,
                itemPrice: datas.price/1000
            }
            console.log(itemValues);

            // LOCAL STORAGE
            // Store localStorage varaible into js varaiable
            let storeItem = JSON.parse(localStorage.getItem("item"));
            console.log(storeItem);
            // check if an item is already stored
            if(!storeItem){
                storeItem = [];
            }
            // Store js varaible into localstorage
            storeItem.push(itemValues);
            localStorage.setItem("item", JSON.stringify(storeItem));
            // Display the total number of items into carts icon
            
            let countItemCart = document.getElementById('button');
            const numberItemInfo = document.createElement("div");
            numberItemInfo.classList.add("add-cart");

            for(let itemWholeQuantity in storeItem){
                numberItemInfo.innerText = itemWholeQuantity;
            }
            document.getElementById("cart-link").appendChild(numberItemInfo);

        });
    })
    .catch(error => alert(error))
}

getCardItem();