addItemToCart();

function addItemToCart() {
    let storeItem = JSON.parse(localStorage.getItem("item"));
    console.log(storeItem);

    if(!storeItem){
        document.getElementById("cart-content").innerHTML = `
        <div class='container my-3 py-3 fs-5 rounded bg-light text-center text-white orinoco-stripe'><div><p>Votre panier est vide</p></div></div>
        `;
    } else {
        for (let k in storeItem) {
            document.getElementById("cart-item").innerHTML = `
            <tr>
              <td>${storeItem[k].itemName}</td>
              <td>${storeItem[k].itemOptions}</td>
              <td>${storeItem[k].itemQuantity}</td>
              <td><button class="btn btn-light remove-item"><i class="fas fa-trash-alt"></i></button></td>
              <td id="itemPrice">${storeItem[k].itemPrice}</td>
            </tr>
            `;
        }        
    }
    
}