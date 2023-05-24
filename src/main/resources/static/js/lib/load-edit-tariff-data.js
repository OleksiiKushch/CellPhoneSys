$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:9000/tariff/" + getTariffUuidFromHref(),
        success: function (data) {
            document.getElementById("tariffUuid").value = data.tariffUuid;
            document.getElementById("createdAt").value = data.createdAt;
            document.getElementById("inputOverAt").value = data.overAt;
            document.getElementById("inputForceOverAt").value = data.forceOverAt;
            document.getElementById("inputName").value = data.name;
            document.getElementById("inputDescription").value = data.description;
            document.getElementById("inputPrice").value = data.price;
            document.getElementById("inputTariffMessages").value = data.tariffMessages;
        }
    });
});

function getTariffUuidFromHref() {
    return window.location.href.split("?")[1].split("=")[1];
}