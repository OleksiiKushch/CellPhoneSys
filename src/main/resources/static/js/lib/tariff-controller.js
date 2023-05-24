function createNewTariff() {
    cleanUpFormHelpMessages();

    $.ajax({
        type: "POST",
        url: "http://localhost:9000/tariff",
        contentType: "application/json",
        data: JSON.stringify({
            createdAt: getCurrentDate(),
            overAt: getDateFromForm("inputOverAt"),
            forceOverAt: getDateFromForm("inputForceOverAt"),
            name: document.getElementById("inputName").value,
            description: document.getElementById("inputDescription").value,
            price: document.getElementById("inputPrice").value,
            tariffMessages: +document.getElementById("inputTariffMessages").value
        }),
        success: function () {
            document.getElementById("success-block").classList.remove("display-none");
            cleanUpFormFields();
        },
        error: function () {
            document.getElementById("error-block").classList.remove("display-none");
        }
    });
}

function editTariff() {
    cleanUpFormHelpMessages();

    $.ajax({
        type: "POST",
        url: "http://localhost:9000/tariff",
        contentType: "application/json",
        data: JSON.stringify({
            tariffUuid: document.getElementById("tariffUuid").value,
            createdAt: document.getElementById("createdAt").value,
            overAt: getDateFromForm("inputOverAt"),
            forceOverAt: getDateFromForm("inputForceOverAt"),
            name: document.getElementById("inputName").value,
            description: document.getElementById("inputDescription").value,
            price: document.getElementById("inputPrice").value,
            tariffMessages: +document.getElementById("inputTariffMessages").value
        }),
        success: function () {
            document.getElementById("success-block").classList.remove("display-none");
        },
        error: function () {
            document.getElementById("error-block").classList.remove("display-none");
        }
    });
}

function getCurrentDate() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function getDateFromForm(key) {
    result = document.getElementById(key).value;
    if (!result) {
        return null;
    } else {
        return result;
    }
}

function cleanUpFormHelpMessages() {
    document.getElementById("success-block").classList.add("display-none");
    document.getElementById("error-block").classList.add("display-none");
}

function cleanUpFormFields() {
    document.getElementById("inputOverAt").value = '';
    document.getElementById("inputForceOverAt").value = '';
    document.getElementById("inputName").value = '';
    document.getElementById("inputDescription").value = '';
    document.getElementById("inputPrice").value = '';
    document.getElementById("inputTariffMessages").value = '';
}