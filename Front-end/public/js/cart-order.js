addItemToCart();
removeItemToCart();
getInputForm();

function addItemToCart() {
    // Check if cart is empty and display each item cart row
    displayRowItemCart();

    // Calculate & display total price of order
    displayTotalOrderPrice();
}

function removeItemToCart() {
    let discardButton = Array.from(document.querySelectorAll(".remove-item"));

    for(let i in discardButton) {
        discardButton[i].addEventListener("click", (e) => {
            e.preventDefault();
            let storeItem = JSON.parse(localStorage.getItem("item"));
            discardButton[i].parentElement.parentElement.style.display="none";
            
            // delete the id element of the array in local storage
            let storeItemId = storeItem[i].itemId;
            storeItem = storeItem.filter(id => id.itemId !== storeItemId);
            
            localStorage.setItem("item", JSON.stringify(storeItem));
            window.location.href = "cart-order.html";
        })
    }
}

function displayRowItemCart () {
    let storeItem = JSON.parse(localStorage.getItem("item"));
    console.log(storeItem);

    if(!storeItem || storeItem == 0){
        document.getElementById("cart-content").innerHTML = `
        <div class='container my-3 py-3 fs-5 rounded bg-light text-center text-white orinoco-stripe'><div><p>Votre panier est vide</p></div></div>
        `;
    } else {
        for (let i in storeItem) {
            let totalEachItem = parseInt(storeItem[i].itemPrice)*(storeItem[i].itemQuantity);

            document.getElementById("cart-item").innerHTML += `
            <tr>
              <td>${storeItem[i].itemName}</td>
              <td>${storeItem[i].itemOptions}</td>
              <td>${storeItem[i].itemQuantity}</td>
              <td><button class="btn btn-light remove-item"><i class="fas fa-trash-alt"></i></button></td>
              <td id="itemPrice">${totalEachItem} €</td>
            </tr>
            `;
        }
    }
}

function displayTotalOrderPrice () {
    let storeItem = JSON.parse(localStorage.getItem("item"));
    // Add Price by row
    let totalRowOrder = 0;
    let totalOrderTable = [];

    for(let i in storeItem) {
        let totalRowOrder = parseInt(storeItem[i].itemPrice)*(storeItem[i].itemQuantity);
        totalOrderTable.push(totalRowOrder);
    }

    // Addition of table price values
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    let totalPrice = totalOrderTable.reduce(reducer,0);
    document.getElementById("total-order").innerText = totalPrice + "€";
}

function getInputForm () {

    let form = document.getElementById("signUp");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name");
        console.log(name);
        console.log(name.value);

        let nameRegexp = new RegExp("^[A-Za-z]$");
        let validName = nameRegexp.test(name.value);

        if (validName) {
            console.log("good");
        } else {
            console.log("bad");
        }
    })
    
}