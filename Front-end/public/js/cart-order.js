addItemToCart();
removeItemToCart();
getInputForm();
// sendDatasToServer();

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
        let firstNameValue = document.getElementById("first-name").value;
        let validFirstName = firstNameRegexp.test(firstNameValue);
        
        // firstname
        let lastNameRegexp = new RegExp("^[A-Za-z]{3,30}$");
        let lastNameValue = document.getElementById("last-name").value;
        let validLastName = lastNameRegexp.test(lastNameValue);

        // address
        let addressRegexp = new RegExp("^[0-9A-Za-z\s]{2,30}$");
        let addressValue = document.getElementById("address").value
        let validAddress = addressRegexp.test(addressValue);
        console.log("adresse");
        console.log(validAddress);

        // city
        let cityRegexp = new RegExp("^[A-Za-z]{3,30}$");
        let cityValue = document.getElementById("last-name").value;
        let validCity = cityRegexp.test(cityValue);

        // country
        let countryRegexp = new RegExp("[a-zA-Z]{2,20}");
        let countryValue = document.getElementById("country").value;
        let validCountry = countryRegexp.test(countryValue);

        // zip code
        let zipRegexp = new RegExp("[0-9]{5}");
        let zipValue = document.getElementById("zipCode").value;
        let validZip = zipRegexp.test(zipValue);

        // email
        let emailRegexp = new RegExp("^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$");
        let emailValue = document.getElementById("email").value;
        let validEmail = emailRegexp.test(emailValue);

        if (validFirstName && validLastName && validAddress && validCity && validCountry && validZip && validEmail) {
            let storeItem = JSON.parse(localStorage.getItem("item"));
            let storeItemId = [];
            
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
                product: storeItemId
            };
            console.log(orderInfo);
        } else {
            document.getElementById("warning-form").innerText = "Champs incorrects. Veuillez corriger le formulaire.";
        }
    })
}