// Refresh the number of item icon
showNumberOfItem();

// Message data server error
const serverError = function() {
    let mainContent = document.getElementById('main-content');
    mainContent.innerHTML = "<div class='container my-3 py-3 rounded bg-light' style='max-width: 34rem; height: 60vh'><p>Oups! Le serveur heroku est actuellement indisponible ou en hibernation. Veuillez recharger la page plusieurs fois.</p><p>Ou bien, remplacer la variable <span class='fw-bold>'let apiURL = 'http://localhost:3000''</span> située dans le fichier <span class='fw-bold>api-config.js</span>.<p> Veuillez lancer le serveur local (Port 3000) avec les commandes <span class='fw-bold>'npm install'</span> puis <span class='fw-bold>'node server.js'</span>.</p></div>";
    mainContent.classList.add("text-dark");
}

// Display the total number of items into carts icon
function showNumberOfItem() {     
    let countItemCart = document.getElementById('buttonAddToCart');
    const numberItemInfo = document.createElement("div");
    numberItemInfo.classList.add("add-cart");

    let storeItem = JSON.parse(localStorage.getItem("item"));
    let numberItem = 0;

    for(let indexInArray in storeItem) {
        numberItem += parseInt(storeItem[indexInArray].itemQuantity);
    }
    numberItemInfo.innerText = numberItem;
    document.getElementById("cart-link").appendChild(numberItemInfo);
    
    // Avoid to display the number 0
    if(numberItem == 0) {
        numberItemInfo.classList.remove("add-cart");
        document.getElementById("cart-link").removeChild(numberItemInfo);
    }
}

//get product id
function getProductId() {
	const URLend = new URLSearchParams(window.location.search);
	return URLend.get("id");
}