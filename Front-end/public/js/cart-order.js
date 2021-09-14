addItemToCart();
removeItemToCart();
getInputForm();

function addItemToCart() {
    let storeItem = JSON.parse(localStorage.getItem("item"));
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
    let totalPrice = 0;

    for(let i in storeItem) {
        let totalRowOrder = parseInt(storeItem[i].itemPrice)*(storeItem[i].itemQuantity);
        totalOrderTable.push(totalRowOrder);
    }

    //check if empty
    if(totalOrderTable.length > 0) {
        // Addition of table price values
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let totalPrice = totalOrderTable.reduce(reducer,0);
        document.getElementById("total-order").innerText = totalPrice + "€";
    }
}

function getInputForm () {

    let form = document.getElementById("signUp");

    form.addEventListener("submit", e => {
        e.preventDefault();

        // firstname
        let firstNameRegexp = new RegExp("^[A-Za-z]{3,30}$");
        let validFirstName = firstNameRegexp.test(document.getElementById("first-name").value);

        if (validFirstName) {
            console.log("valid first name");
        } else {
            console.log("wrong first name");
        }
        
        // firstname
        let lastNameRegexp = new RegExp("^[A-Za-z]{3,30}$");
        let validLastName = lastNameRegexp.test(document.getElementById("last-name").value);

        if (validLastName) {
            console.log("valid last name");
        } else {
            console.log("wrong last name");
        }

        // address
        let addressRegexp = new RegExp("^[a-zA-Z0-9\s]{2,30}$");
        let validAddress = addressRegexp.test(document.getElementById("address").value);

        if (validAddress) {
            console.log("valid address");
        } else {
            console.log("wrong address");
        }

        // city
        let cityRegexp = new RegExp("^[A-Za-z]{3,30}$");
        let validCity = cityRegexp.test(document.getElementById("last-name").value);

        if (validCity) {
            console.log("valid city");
        } else {
            console.log("wrong city");
        }

        // country
        let countryRegexp = new RegExp("[a-zA-Z]{2,20}");
        let validCountry = countryRegexp.test(document.getElementById("country").value);

        if (validCountry) {
            console.log("valid country");
        } else {
            console.log("wrong country");
        }

        // zip code
        let zipRegexp = new RegExp("[0-9]{5}");
        let validZip = zipRegexp.test(document.getElementById("zipCode").value);

        if (validZip) {
            console.log("valid zip code");
        } else {
            console.log("wrong zip code");
        }

        // email
        let emailRegexp = new RegExp("^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$");
        let validEmail = emailRegexp.test(document.getElementById("email").value);

        if (validEmail) {
            console.log("valid email");
        } else {
            console.log("bad email");
        }
    })
}