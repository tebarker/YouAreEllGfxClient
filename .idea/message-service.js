export default class MessageService {
getAllMessages() {
    const request = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onload = function () {
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                const threads = JSON.parse(request.responseText);
                // this data is passed to the success callback
                resolve(threads);
            } else {
                // this data is passed to the failure callback
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };

        request.open("GET", "http://zipcode.rocks:8085/messages");

        request.send();
    })
}
messageService.getAllMessages()
    .then(successCallback, errorCallback);

function successCallback(response) {
    // This data comes from the resolve method
    console.log(response);
}

function errorCallback(response) {
    // This data comes from the reject method
    console.log(response);
}
createNewMessage(message) {
    const request = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onload = function () {
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(JSON.parse(request.responseText));
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };

        request.open("POST", `http:zipcode.rocks:8085/ids/${message.fromid}/messages`);

        request.send(JSON.stringify(message));
    });
}
function createFormListener() {
    const form = document.getElementById("new-message-form");

    form.onsubmit = function (event) {
        // stop the regular form submission
        event.preventDefault();

        const data = {
            fromid: userId,
            message: form.message.value
        };

        messageService.createNewMessage(data)
            .then(successCallback, errorCallback);

        function successCallback(response) {
            // This data comes from the resolve method
            addMessageToThread(response);
        }

        function errorCallback(response) {
            // This data comes from the reject method
            console.log(response);
        }
    }
};
}
