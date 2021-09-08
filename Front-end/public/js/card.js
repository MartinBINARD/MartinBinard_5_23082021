// Display seleted item
getCardItem();

// Display the item carateristic
function getCardItem () {
    const id = getProductId();

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
        document.getElementById("main-content").innerHTML = 
        `<div class='text-center'>
            <img class='img-fluid rounded' src=${datas.imageUrl} alt='appareil photo années 60'>
        </div>
        <div class='card-body mx-3'>
            <div class='d-flex justify-content-between align-items-center'>
              <div class='card-title fs-3' id='itemName'>${datas.name}</div>
              <div class='card-title pricing-card-title fs-4' id='itemPrice'>${datas.price/1000}€</div>
            </div>
        <div class='row mx-3'>
            <p class='card-text'>${datas.description}</p>
            <select class='form-select mt-3 my-3' aria-label='Default select example' id='options-list'>
            </select>
            <p class='small-text my-2'>Quantité:</p>
            <select class='form-select' aria-label='Default select example' id='itemQty'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
        </div>
        <div class='d-flex align-items-center my-3'>
            <button type='button' class='btn btn-sm btn-outline-secondary ms-3' data-bs-toggle='modal' data-bs-target='#cartModal' id='buttonAddToCart'>Ajouter au panier</button>
        </div>`;
        // Loop display item options
        const itemLenses = datas.lenses;
        // console.log(itemLenses)
        for(let lense of itemLenses) {
            document.getElementById('options-list').innerHTML += "<option value='"+lense+"'>"+lense+"</option>";
        }
        getItemButtonCart()
    })
    .catch(error => alert(error))
}

function addItem() {
    // Get item values selected
    let itemValues = {
        itemId : getProductId(),
        itemName : document.getElementById('itemName').textContent,
        itemPrice: document.getElementById('itemPrice').textContent,
        itemOptions : document.getElementById('options-list').value,
        itemQuantity : document.getElementById('itemQty').value,
    }
    // LOCAL STORAGE
    // Store localStorage varaible into js varaiable
    let storeItem = JSON.parse(localStorage.getItem("item"));
    // check if an item is already stored
    if(!storeItem){
        storeItem = [];
    }
    // Store js varaible into localstorage
    storeItem.push(itemValues);
    localStorage.setItem("item", JSON.stringify(storeItem));
}

function getItemButtonCart() {
    // Add to cart listener button
    const buttonAddToCart = document.getElementById('buttonAddToCart');

    buttonAddToCart.addEventListener('click', (e) => {
        e.preventDefault();
        addItem();
        showNumberOfItem();
    });
}