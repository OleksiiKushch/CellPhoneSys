function registerNewSubscriber() {
    cleanUpFormHelpMessages();

    var password = document.getElementById("inputPassword").value;
    var confirmationPassword = document.getElementById("inputConfirmationPassword").value
    if (password != confirmationPassword) {
        var errorBlock = document.getElementById("error-block");
        errorBlock.classList.remove("display-none");
        errorBlock.insertAdjacentHTML("beforeend", "<span>Password and confirmation password must match.</span>");
        return;
    }

    var jsonData = JSON.stringify({
        name: document.getElementById("inputName").value,
        surname: document.getElementById("inputSurname").value,
        phoneNumber: document.getElementById("inputPhoneNumber").value,
        password: password,
        balance: document.getElementById("inputBalance").value,
        tariffUuid: document.getElementById("selectTariff").value
    })

    $.ajax({
        type: "POST",
        url: "http://localhost:9000/subscriber",
        contentType: "application/json",
        data: jsonData,
        success: function() {
            authorizeUser(jsonData);
        },
        error: function (data) {
            showErrorMessages(data, "error-block");
        }
    });
}

function login() {
    var credential = JSON.stringify({
        phoneNumber: document.getElementById("inputPhoneNumber").value,
        password: document.getElementById("inputPassword").value
    })

    generateUserToken(function(token) {
        $.ajax({
            type: "GET",
            url: "http://localhost:9000/subscriber",
            contentType: "application/json",
            headers: {
                'Authorization': 'Basic ' + token
            },
            success: function() {
                authorizeUser(credential);
            },
            error: function (data) {
                showErrorMessages(data, "error-block");
            }
        });
    }, credential);
}

function logout() {
    $.ajax({
        type: "POST",
        url: window.location.origin + "/logout",
        success: function() {
            goToHomePage();
        }
    });
}

function authorizeUser(jsonData) {
    $.ajax({
        type: "POST",
        url: window.location.origin + "/authorize",
        contentType: "application/json",
        data: jsonData,
        success: function() {
            updateDataInSession(goToHomePage);
        }
    });
}

function deactivateAccount() {
    getUserToken(function(token) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:9000/subscriber",
            headers: {
                'Authorization': 'Basic ' + token
            },
            success: logout,
            error: function (data) {
                showErrorMessages(data, "deactivate-account-error-block");
            }
        });
    });
}

function updateDataInSession(reloadFunction) {
    getUserToken(function(token) {
        $.ajax({
            type: "GET",
            url: "http://localhost:9000/subscriber",
            contentType: "application/json",
            headers: {
                'Authorization': 'Basic ' + token
            },
            success: function(data) {
                $.ajax({
                    type: "POST",
                    url: window.location.origin + "/updateDataInSession",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: function () {
                        reloadFunction();
                    }
                });
            }
        });
    });
}

function getUserToken(handleData) {
    $.ajax({
        type: "GET",
        url: window.location.origin + "/getUserToken",
        contentType: "application/json",
        success: function(data) {
            handleData(data);
        }
    });
}

function generateUserToken(handleData, credential) {
    $.ajax({
        type: "POST",
        url: window.location.origin + "/generateUserToken",
        contentType: "application/json",
        data: credential,
        success: function(data) {
            handleData(data);
        }
    });
}

function loadExpensesHistory() {
    getUserToken(function(token) {
        $.ajax({
            type: "GET",
            url: "http://localhost:9000/expenses",
            headers: {
                'Authorization': 'Basic ' + token
            },
            success: function (data) {
                var container = document.getElementById("container-for-expenses");
                data.forEach(obj => {
                    container.insertAdjacentHTML("beforeend", '<tr><th class="col-md-6">' + obj.chargedAt +
                        '</th><th class="col-md-4">' + obj.tariffUuid.substring(0,8) + '</th><th class="col-md-2">' + obj.expenses + '</th></tr>');
                });
            }
        });
    });
}

function topUpMyBalance() {
    $.ajax({
        type: "POST",
        url: "http://localhost:9000/subscriber/" + document.getElementById("yourPhoneNumber").value + "/payment",
        contentType: "application/json",
        data: JSON.stringify({
            balance: document.getElementById("topUpOnSum").value
        }),
        success: function() {
            updateDataInSession(reloadCurrentPage);
        }, error: function (data) {
            showErrorMessages(data, "top-up-your-balance-error-block");
        }
    });
}

function topUpYourFriendBalance() {
    $.ajax({
        type: "POST",
        url: "http://localhost:9000/subscriber/" + document.getElementById("yourFriedPhoneNumber").value + "/payment",
        contentType: "application/json",
        data: JSON.stringify({
            balance: document.getElementById("topUpOnSumForYourFriend").value
        }),
        success: function() {
            updateDataInSession(reloadCurrentPage);
        }, error: function (data) {
            showErrorMessages(data, "top-up-your-friend-balance-error-block");
        }
    });
}

function changeTariff() {
    getUserToken(function(token) {
        $.ajax({
            type: "POST",
            url: "http://localhost:9000/tariff/subscriber",
            contentType: "application/json",
            headers: {
                'Authorization': 'Basic ' + token
            },
            data: JSON.stringify({
                tariff: document.getElementById("selectTariff").value
            }),
            success: function () {
                updateDataInSession(reloadCurrentPage);
            },
            error: function (data) {
                showErrorMessages(data, "change-tariff-error-block");
            }
        });
    });
}

function loadAllChats() {
    getUserToken(function(token) {
        $.ajax({
            type: "GET",
            url: "http://localhost:9000/chat",
            contentType: "application/json",
            headers: {
                'Authorization': 'Basic ' + token
            },
            success: function (data) {
                var container = document.getElementById("container-for-chats");
                data.forEach(number => {
                    container.insertAdjacentHTML("beforeend", '<div class="mb-2"><button id="' + number +
                        '" type="button" class="btn btn-secondary btn-lg" onclick="selectChat(this.textContent)">' +
                        number + '</button></div>');
                });
            }
        });
    });
}

function loadAllChatsCallBack(callback) {
    var chatContainer = document.getElementById("container-for-chats");
    cleanChatContainer(chatContainer)

    getUserToken(function(token) {
        $.ajax({
            type: "GET",
            url: "http://localhost:9000/chat",
            contentType: "application/json",
            headers: {
                'Authorization': 'Basic ' + token
            },
            success: function (data) {
                data.forEach(number => {
                    chatContainer.insertAdjacentHTML("beforeend", '<div class="mb-2"><button id="' + number +
                        '" type="button" class="btn btn-secondary btn-lg" onclick="selectChat(this.textContent)">' +
                        number + '</button></div>');
                });
                callback();
            }
        });
    });
}

function selectChat(phoneNumber) {
    loadAllChatsCallBack(function() {
        var messageContainer = document.getElementById("container-for-messages");
        cleanMessageContainer(messageContainer);
        getUserToken(function(token) {
            $.ajax({
                type: "GET",
                url: "http://localhost:9000/message/" + phoneNumber,
                contentType: "application/json",
                headers: {
                    'Authorization': 'Basic ' + token
                },
                success: function (data) {
                    document.getElementById("inputPhoneNumber").value = phoneNumber;
                    data.forEach(obj => {
                        if (obj.phoneNumber == phoneNumber && obj.sender == true || obj.phoneNumber != phoneNumber && obj.sender == false) {
                            messageContainer.insertAdjacentHTML("afterbegin", '<tr><td class="col-md-1 text-center">></td><td class="col-md-5">' +
                                '<small class="fw-lighter">' + obj.sentAt + '</small><br>' + obj.message.replace(/\n/g, "<br />") +
                                '</td><td class="col-md-5" style="color: #FFFFFF"></td><td class="col-md-1" style="color: #FFFFFF"></td></tr>');
                        } else {
                            messageContainer.insertAdjacentHTML("afterbegin", '<tr style="background-color: #F2F2F2"><td class="col-md-1"></td><td class="col-md-5"></td><td class="col-md-5">' +
                                '<small class="fw-lighter">' + obj.sentAt + '</small><br>' + obj.message.replace(/\n/g, "<br />") +
                                '</td><td class="text-center col-md-1"><</td></tr>');
                        }
                    });
                    document.getElementById(phoneNumber).classList.remove('btn-secondary');
                    document.getElementById(phoneNumber).classList.add('btn-success');
                    scrollMessageHistoryToStart();
                }
            });
        });
    })
}

function sendMessage() {
    var phoneNumber = document.getElementById("inputPhoneNumber").value;
    var message = document.getElementById("inputMessage").value;

    getUserToken(function(token) {
        $.ajax({
            type: "POST",
            url: "http://localhost:9000/message/" + phoneNumber,
            contentType: "application/json",
            data: JSON.stringify({
                content: message
            }),
            headers: {
                'Authorization': 'Basic ' + token
            },
            success: function () {
                document.getElementById("inputMessage").value = '';
                selectChat(phoneNumber);
                updateDataInSession(null);
            },
            error: function (data) {
                showErrorMessages(data, "error-block");
            }
        });
    });
}

function cleanMessageContainer(messageContainer) {
    messageContainer.replaceChildren();
}

function cleanChatContainer(chatContainer) {
    chatContainer.replaceChildren();
}

function scrollMessageHistoryToStart() {
    var scrollDiv = document.querySelector(".messages-table-data");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
}

function goToHomePage() {
    window.location.replace(window.location.origin);
}

function reloadCurrentPage() {
    location.reload();
}

function cleanUpFormHelpMessages() {
    document.getElementById("success-block").classList.add("display-none");
    var errorBlock = document.getElementById("error-block");
    errorBlock.classList.add("display-none");
    errorBlock.innerHTML = '';
}

function cleanUpFormFields() {
    document.getElementById("inputName").value = '';
    document.getElementById("inputSurname").value = '';
    document.getElementById("inputPhoneNumber").value = '';
    document.getElementById("inputPassword").value = '';
    document.getElementById("inputConfirmationPassword").value = '';
    document.getElementById("inputBalance").value = '';
}

function showErrorMessages(data, blockId) {
    var errorBlock = document.getElementById(blockId);
    errorBlock.classList.remove("display-none");
    errorBlock.insertAdjacentHTML("beforeend", "<span>Something went wrong! Please try again.</span><br><span>Error: "
        + data.responseText + "</span>");
}