const socket = io();
const nome = document.getElementById('name-user');
const color = document.getElementById('color');
const chatlog = document.getElementById('chat-log');

const colorList = [
    'black',
    'red',
    'orange',
    'yellow',
    'green',
    'cyan',
    'blue',
    'purple',
    'wine'
]
let currentColor = 0;
let ipAdress = '';
let chatLogData = [];

function changeName(){
    color.id = `color ${(colorList[currentColor])}`;
    currentColor = Math.floor(Math.random()*9)
    console.log()

    let newName = ''
    while (newName === '' || newName === null || newName === undefined){
        newName = window.prompt('Digite o seu nome: ');
    }
    console.log(newName);
    nome.textContent = newName;
    socket.emit('change_name', [newName, colorList[currentColor]]);
}

function createChatBubble(name, color, text){
    if(currentColor === null || currentColor === undefined) currentColor = Math.floor(Math.random()*9)
    const newChat = document.createElement('div');
    newChat.classList.add('chat');

    if (name && color) {
        const nameDiv = document.createElement('div');
        nameDiv.classList.add(`name-user-chat`);
        nameDiv.classList.add(`${color}`);        
        nameDiv.innerText = name;
        newChat.appendChild(nameDiv);
    } else {
        newChat.classList.add(`chat-self`);
        newChat.classList.add(`${colorList[currentColor]}`);        
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
    socket.emit('send', [text, ipAdress]);
    document.getElementById('input-text').value = '';
}

function updateChat(chatlist){
    console.log(chatLogData);
    chatlist.forEach((chat) => {
        if(!(chatLogData.includes(chat.chat_id))){
            if(chat.ip === ipAdress)
                chatlog.appendChild(createChatBubble('', '', chat.text))
            else 
                chatlog.appendChild(createChatBubble(chat.name, chat.color, chat.text));
            chatLogData.push(chat.chat_id);
        }
        //console.log(chat, chatLogData, chatLogData.includes(chat.chat_id));
    });
}

socket.on('first_entry', (Data) => {
    const usuario = Data[0];
    const chatData = Data[1];

    if(usuario.nome === '') changeName();
    else {
        nome.innerText = usuario.nome;
        currentColor = usuario.cor;
        ipAdress = usuario.ip;
    }
    updateChat(chatData);
})

socket.on('update', updateChat);