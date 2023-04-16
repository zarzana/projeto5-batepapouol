axios.defaults.headers.common['Authorization'] = 'Fxjk1r6zE4PiUsz1zfhA34GZ';

let messages = null;
let username = null;

userLogin();

const sendButton = document.querySelector('.send-button');
sendButton.addEventListener('click', sendMessage)

function userLogin () {

    username = prompt('Qual é o seu nome?')

    var usernameData = {name: username}

    const usernamePromise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', usernameData);
    usernamePromise.then(getMessages);
    usernamePromise.catch(userLogin);

    setInterval(() => {const usernamePromise = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', data)}, 5000);
    setInterval(getMessages, 3000);

}

function getMessages () {

        const chatPromise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
        chatPromise.then(setMessagesGlobal);

        renderChat();

}

function setMessagesGlobal (response) {

    messages = response.data;

    renderChat();

}

function renderChat () {

    const chatContent = document.querySelector('.chat-content');
    chatContent.innerHTML = '';

    for (let i = 0; i < messages.length; i++) {

        let currentMessage = messages[i];

        if (currentMessage.type == 'status') {

            var messageElement = document.createElement('div');
            messageElement.setAttribute('class', 'message notification');
            messageElement.setAttribute('data-test', 'message');

            var messageElementText = document.createElement('p');
            messageElementText.innerHTML = `<time>(${currentMessage.time})</time>  <strong>${currentMessage.from}</strong> ${currentMessage.text}`;

            messageElement.appendChild(messageElementText);
            chatContent.appendChild(messageElement);

        } else if (currentMessage.type == 'message') {

            var messageElement = document.createElement('div');
            messageElement.setAttribute('class', 'message');
            messageElement.setAttribute('data-test', 'message');

            var messageElementText = document.createElement('p');
            messageElementText.innerHTML = `<time>(${currentMessage.time})</time>  <strong>${currentMessage.from}</strong> para <strong>${currentMessage.to}</strong>: ${currentMessage.text}`;

            messageElement.appendChild(messageElementText);
            chatContent.appendChild(messageElement);

        } else if (currentMessage.type =='private_message' && currentMessage.to == username) {

            var messageElement = document.createElement('div');
            messageElement.setAttribute('class', 'message private');
            messageElement.setAttribute('data-test', 'message');

            var messageElementText = document.createElement('p');
            messageElementText.innerHTML = `<time>(${currentMessage.time})</time>  <strong>${currentMessage.from}</strong> privadamente para <strong>${currentMessage.to}</strong>: ${currentMessage.text}`;

            messageElement.appendChild(messageElementText);
            chatContent.appendChild(messageElement);

        }

    }

    if (chatContent.lastElementChild !== messages.length -1) {
        chatContent.lastElementChild.scrollIntoView({behavior: 'smooth'});
    }
}

function sendMessage () {

    if (messageTyped = '') {

        return false;

    } else {

        var userMessage = document.querySelector('input').value;
        const data = {from: username, to: 'Todos', text: userMessage, type: 'message'};
    
        const messagePromisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', data);
        messagePromisse.then(refreshChat);
        messagePromisse.catch(window.location.reload);

        document.querySelector('input').value='';

    }
}

function refreshChat () {

    getMessages();
    document.querySelector('input').value='';

}

