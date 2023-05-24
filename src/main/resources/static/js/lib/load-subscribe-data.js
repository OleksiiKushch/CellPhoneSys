function loadSelectiveListOfAllTariffs() {
    $.ajax({
        type: "GET",
        url: "http://localhost:9000/tariff",
        success: function (data) {
            var container = document.getElementById("selectTariff");
            data.forEach(obj => {
                container.insertAdjacentHTML("beforeend", "<option value=" + obj.tariffUuid + ">" + obj.name + "</option>");
            })
        }
    });
}

function loadSelectiveListOfAllTariffsForChangeTariff() {
    var currentTariffUuid = document.getElementById("currentTariffUuid").value;

    $.ajax({
        type: "GET",
        url: "http://localhost:9000/tariff",
        success: function (data) {
            var container = document.getElementById("selectTariff");
            data.forEach(obj => {
                if (currentTariffUuid !== obj.tariffUuid) {
                    container.insertAdjacentHTML("beforeend", "<option value=" + obj.tariffUuid + ">" + obj.name + "</option>");
                }
            })
        }
    });
}

function loadDataForCurrentTariff() {
    $.ajax({
        type: "GET",
        url: "http://localhost:9000/tariff/" + document.getElementById("currentTariffUuid").value,
        success: function (data) {
            document.getElementById("currentTariff").value = data.name;
            document.getElementById("currentTariffInfo").innerHTML = data.name;
        }
    });
}