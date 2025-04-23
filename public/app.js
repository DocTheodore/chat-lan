const socket = io();
const nome = document.getElementById('name-user');
const color = document.getElementById('color');
const chatlog = document.getElementById('chat-log');

let currentColor = 'Black'

function changeName(){
    let newName = ''
    while (newName === '' || newName === null){
        newName = window.prompt('Digite o seu nome: ');
    }
    console.log(newName);
    nome.textContent = newName;
    socket.emit('change_name', [newName, currentColor]);
}

function createChatBubble(name, color, text){
    const newChat = document.createElement('div');
    newChat.classList.add('chat');

    if (name && color) {
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name-user-chat');
        nameDiv.innerText = name;
        nameDiv.style.color = color;
        newChat.appendChild(nameDiv);
    } else {
        newChat.classList.add('chat-self');
    }

    const textDiv = document.createElement('div');
    textDiv.classList.add('chat-text');
    textDiv.innerText = text;
    newChat.appendChild(textDiv);

    return newChat;
}

function sendChat(key) {
    if(key){
        if(event.keyCode !== 13) return
    }
    let text = document.getElementById('input-text').value;
    if(!text) return;
    socket.emit('send', text);
    document.getElementById('input-text').value = '';
}

socket.on('first_entry', (usuario) => {
    if(usuario.nome === '') changeName();
    else {
        nome.innerText = usuario.nome;
        currentColor = usuario.cor;
    }
})

socket.on('update', (chatlist, ipAtual) => {
    chatlog.innerHTML = '';
    chatlist.forEach(chat => {
        if(chat.ip === ipAtual) chatlog.appendChild(createChatBubble('', '', chat.text))
        else chatlog.appendChild(createChatBubble(chat.name, chat.color, chat.text));
        console.log(chat);
    });
})