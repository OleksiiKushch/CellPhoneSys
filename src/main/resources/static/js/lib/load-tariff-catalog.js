const FIELDS = ["createdAt", "overAt", "forceOverAt", "name", "description", "price", "tariffMessages"];

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:9000/tariff",
        success: function (data) {
            var container = document.getElementById("container-for-tariff-data");
            var i = 0;
            data.forEach(obj => {
                tr = document.createElement("tr");
                tr.insertAdjacentHTML("beforeend", '<th class="col-md-1">' + ++i + '</th>');
                var td;
                var content;
                FIELDS.forEach(key => {
                    td = document.createElement("td");
                    if (typeof obj[key] !== 'undefined') {
                        content = document.createTextNode(obj[key]);
                    } else {
                        content = document.createTextNode("-");
                    }

                    if (key == "description") {
                        td.classList.add("col-md-2");
                    } else {
                        td.classList.add("col-md-1");
                    }
                    td.appendChild(content);
                    tr.appendChild(td);
                })
                tr.insertAdjacentHTML("beforeend", '<td class="col-md-1"><a href="' + formedUrlForEditTariff(obj) + '">edit</a></td>');
                container.insertAdjacentHTML("beforeend", tr.innerHTML);
            });
        }
    });
});

function formedUrlForEditTariff(obj) {
    return window.location.origin + "/edit-tariff?tariffUuid=" + obj["tariffUuid"];
}