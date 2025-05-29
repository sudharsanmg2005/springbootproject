let stompClient = null;
let currentUser = null;

function connect() {
    currentUser = document.getElementById('sender').value;
    if (!currentUser) {
        alert('Please enter your name');
        return;
    }

    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages/' + currentUser, function (message) {
            showMessage(JSON.parse(message.body));
        });
    });
}

function sendMessage() {
    const sender = document.getElementById('sender').value;
    const receiver = document.getElementById('receiver').value;
    const content = document.getElementById('messageInput').value;

    if (!sender || !receiver || !content) {
        alert('Please fill in all fields');
        return;
    }

    if (!stompClient) {
        connect();
    }

    stompClient.send("/app/sendMessage", {}, JSON.stringify({
        'sender': sender,
        'receiver': receiver,
        'content': content
    }));
    document.getElementById('messageInput').value = '';
}

function showMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + (message.sender === currentUser ? 'sent' : 'received');
    
    const contentElement = document.createElement('div');
    contentElement.innerText = message.content;
    
    const timestampElement = document.createElement('div');
    timestampElement.className = 'timestamp';
    timestampElement.innerText = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageElement.appendChild(contentElement);
    messageElement.appendChild(timestampElement);
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

document.getElementById('sender').addEventListener('change', function() {
    if (this.value && !stompClient) {
        connect();
    }
});