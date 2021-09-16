getInputForm();

// Get input form, send it to server & get the orderID

function getInputForm () {

    document.getElementById("signUp").addEventListener("submit", e => {
        e.preventDefault();

        // Check firstname form
        let firstNameRegexp = new RegExp("^[A-Za-z]{3,30}$");
        let firstNameValue = document.getElementById("first-name").value;
        let validFirstName = firstNameRegexp.test(firstNameValue);
        console.log(firstNameValue);
        console.log(typeof(firstNameValue));

        // Check firstname form
        let lastNameRegexp = new RegExp("^[A-Za-z]{3,30}$");
        let lastNameValue = document.getElementById("last-name").value;
        let validLastName = lastNameRegexp.test(lastNameValue);

        // Check address form
        let addressRegexp = new RegExp("^[0-9A-Za-z\s]{2,30}$");
        let addressValue = document.getElementById("address").value
        let validAddress = addressRegexp.test(addressValue);
        console.log("adresse");
        console.log(validAddress);

        // Check city form
        let cityRegexp = new RegExp("^[A-Za-z]{3,30}$");
        let cityValue = document.getElementById("last-name").value;
        let validCity = cityRegexp.test(cityValue);

        // Check country form
        let countryRegexp = new RegExp("[a-zA-Z]{2,20}");
        let countryValue = document.getElementById("country").value;
        let validCountry = countryRegexp.test(countryValue);

        // Check zip code form
        let zipRegexp = new RegExp("[0-9]{5}");
        let zipValue = document.getElementById("zipCode").value;
        let validZip = zipRegexp.test(zipValue);

        // Check email form
        let emailRegexp = new RegExp("^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$");
        let emailValue = document.getElementById("email").value;
        let validEmail = emailRegexp.test(emailValue);

        // Check the customer form & POST it to server
        if (validFirstName && validLastName && validAddress && validCity && validCountry && validZip && validEmail) {
            // Call the customer items choice in order to create an oject ready to send to server 
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
                products: storeItemId
            };
            console.log(orderInfo);
            orderInfoJSON = JSON.stringify(orderInfo);
            console.log(orderInfoJSON);
            
            // Send itemId & customer form to server, then send customer to the validation page
            const sendToServer = fetch("http://localhost:3000/api/cameras/order", {
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
                console.log(returnResponse);
                let storeOrderId = returnResponse.orderId;

                // Store the order id to localStorage
                localStorage.setItem("oderIdKey", JSON.stringify(storeOrderId));
                console.log("commande validée !!!");
                
                // window.location.href = "validation.html";
                // document.getElementById("validation-order").innerText = `${orerderId}`
            })

        } else {
            document.getElementById("warning-form").innerText = "Champs incorrects. Veuillez corriger le formulaire.";
        }
    })
}