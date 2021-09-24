addItemToCart();
removeItemToCart();
checkAndSendToServer();

function addItemToCart() {
    let storeItem = JSON.parse(localStorage.getItem("item"));
    // Check if cart is empty and display each item cart row
    displayRowItemCart();

    // Calculate & display total price of order
    displayTotalOrderPrice();
}

function removeItemToCart () {
    // select all discard button in the HTML
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
    
    // If the localStorage is empty, do not display the table.
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
    let totalOrderTable = [];

    for(let i in storeItem) {
        let totalRowOrder = parseInt(storeItem[i].itemPrice)*(storeItem[i].itemQuantity);
        totalOrderTable.push(totalRowOrder);
    }

    //check if cart item is empty to prevent totalPriceItem bug
    if(totalOrderTable.length > 0) {
        // Addition of table price values
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let totalPrice = totalOrderTable.reduce(reducer,0);
        document.getElementById("total-order").innerText = totalPrice + "€";
        // Store Order Total Price to localstorage to display it in validation page later
        localStorage.setItem("orderTotalPrice",JSON.stringify(totalPrice));
    }
}

// Check order & send it to server
function checkAndSendToServer () {
    document.getElementById("signUp").addEventListener("submit", e => {
        e.preventDefault();
        let storeItem = JSON.parse(localStorage.getItem("item"));

        checkInputForm();
        
        if(checkInputForm() != false && storeItem != 0 && storeItem != null) {
            sendOrderDatas();
        } else {
            document.getElementById("signUp").reset();
        }
    })
}

// Check regexp input form
function checkInputForm () {    
    // Check firstname form
    let firstNameRegexp = new RegExp("^[A-Za-zÀ-ú]{3,30}$");
    let validFirstName = firstNameRegexp.test(document.getElementById("first-name").value);
    
    // Check firstname form
    let lastNameRegexp = new RegExp("^[A-Za-zÀ-ú]{3,30}$");
    let validLastName = lastNameRegexp.test(document.getElementById("last-name").value);
    
    // Check address form
    let addressRegexp = new RegExp("^[0-9A-Za-zÀ-ú' ']{2,30}$");
    let validAddress = addressRegexp.test(document.getElementById("address").value);
    
    // Check city form
    let cityRegexp = new RegExp("^[A-Za-zÀ-ú]{3,30}$");
    let validCity = cityRegexp.test(document.getElementById("city").value);
    
    // Check country form
    let countryRegexp = new RegExp("[a-zA-ZÀ-ú]{2,20}");
    let validCountry = countryRegexp.test(document.getElementById("country").value);
    
    // Check zip code form
    let zipRegexp = new RegExp("[0-9]{5}");
    let validZip = zipRegexp.test(document.getElementById("zipCode").value);
    
    // Check email form
    let emailRegexp = new RegExp("^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$");
    let validEmail = emailRegexp.test(document.getElementById("email").value);
    
    // Check the customer form
    if (!validFirstName) {
        document.getElementById("warning-first-name").classList.remove("d-none");
        document.getElementById("warning-last-name").classList.add("d-none");
        document.getElementById("warning-address").classList.add("d-none");
        document.getElementById("warning-city").classList.add("d-none");
        document.getElementById("warning-country").classList.add("d-none");
        document.getElementById("warning-zip-code").classList.add("d-none");
        document.getElementById("warning-email").classList.add("d-none");
        return false;
    } else if (!validLastName) {
        document.getElementById("warning-first-name").classList.add("d-none");
        document.getElementById("warning-last-name").classList.remove("d-none");
        document.getElementById("warning-address").classList.add("d-none");
        document.getElementById("warning-city").classList.add("d-none");
        document.getElementById("warning-country").classList.add("d-none");
        document.getElementById("warning-zip-code").classList.add("d-none");
        document.getElementById("warning-email").classList.add("d-none");
        return false;
    } else if (!validAddress) {
        document.getElementById("warning-first-name").classList.add("d-none");
        document.getElementById("warning-last-name").classList.add("d-none");
        document.getElementById("warning-address").classList.remove("d-none");
        document.getElementById("warning-city").classList.add("d-none");
        document.getElementById("warning-country").classList.add("d-none");
        document.getElementById("warning-zip-code").classList.add("d-none");
        document.getElementById("warning-email").classList.add("d-none");
        return false;
    } else if (!validCity) {
        document.getElementById("warning-first-name").classList.add("d-none");
        document.getElementById("warning-last-name").classList.add("d-none");
        document.getElementById("warning-address").classList.add("d-none");
        document.getElementById("warning-city").classList.remove("d-none");
        document.getElementById("warning-country").classList.add("d-none");
        document.getElementById("warning-zip-code").classList.add("d-none");
        document.getElementById("warning-email").classList.add("d-none");
        return false;
    } else if (!validCountry) {
        document.getElementById("warning-first-name").classList.add("d-none");
        document.getElementById("warning-last-name").classList.add("d-none");
        document.getElementById("warning-address").classList.add("d-none");
        document.getElementById("warning-city").classList.add("d-none");
        document.getElementById("warning-country").classList.remove("d-none");
        document.getElementById("warning-zip-code").classList.add("d-none");
        document.getElementById("warning-email").classList.add("d-none");
        return false;
    } else if (!validZip) {
        document.getElementById("warning-first-name").classList.add("d-none");
        document.getElementById("warning-last-name").classList.add("d-none");
        document.getElementById("warning-address").classList.add("d-none");
        document.getElementById("warning-city").classList.add("d-none");
        document.getElementById("warning-country").classList.add("d-none");
        document.getElementById("warning-zip-code").classList.remove("d-none");
        document.getElementById("warning-email").classList.add("d-none");
        return false;
    }else if (!validEmail) {
        document.getElementById("warning-first-name").classList.add("d-none");
        document.getElementById("warning-last-name").classList.add("d-none");
        document.getElementById("warning-address").classList.add("d-none");
        document.getElementById("warning-city").classList.add("d-none");
        document.getElementById("warning-country").classList.add("d-none");
        document.getElementById("warning-zip-code").classList.add("d-none");
        document.getElementById("warning-email").classList.remove("d-none");
        return false;
    } else {
        return true;
    }
}

// Send it to server & get the orderID
function sendOrderDatas () {
    // Call the customer items choice in order to create an oject ready to send to server
    let firstNameValue = document.getElementById("first-name").value;
    let lastNameValue = document.getElementById("last-name").value;
    let addressValue = document.getElementById("address").value;
    let cityValue = document.getElementById("last-name").value;
    let countryValue = document.getElementById("country").value;
    let zipValue = document.getElementById("zipCode").value;
    let emailValue = document.getElementById("email").value;

    let storeItem = JSON.parse(localStorage.getItem("item"));
    let storeItemId = [];
    let storeOrderTotalPrice = [];
    
    for(let i in storeItem) {
        storeItemId.push(storeItem[i].itemId);
    }

    const orderInfo = {
        contact: {
            firstName: firstNameValue,
            lastName: lastNameValue,
            address: addressValue,
            city: cityValue,
            email: emailValue
        },
        products: storeItemId
    };
    
    orderInfoJSON = JSON.stringify(orderInfo);

    // Send itemId & customer form to server, then send customer to the validation page
    const sendToServer = fetch(`${apiURL}/api/cameras/order`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(orderInfo)
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        else (console.error(response.status))})
    .then(returnResponse => {
        let storeOrderId = returnResponse.orderId;
        // Store the order id to localStorage
        localStorage.setItem("oderIdKey", JSON.stringify(storeOrderId));
        window.location.href = "validation.html";
    })
}