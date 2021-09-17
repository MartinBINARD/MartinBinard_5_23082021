displayOrderValidation();
returnToHome();

// Display total order price & order id then clear the localstorage

function displayOrderValidation() {
    let storeOrderId = localStorage.getItem("oderIdKey");
    let totalOrderPrice = localStorage.getItem("orderTotalPrice");

    document.getElementById("validation-order").innerText = `${storeOrderId}`;
    document.getElementById("total-validation-order").innerText = `${totalOrderPrice}`;

    localStorage.clear();
}

// Return to home page in case of reloading page
function returnToHome() {
    if (sessionStorage.getItem('reload') === 'orderValidated') {
        window.location.href = "index.html";
    }
    sessionStorage.setItem('reload', 'orderValidated');
}