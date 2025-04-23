const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ip = require('ip');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


//Pasta que sera enviada na rede
app.use(express.static('public'));

//Lista de Usuarios
let userList = [];
let chatLog = [];

//Função que confere o ip do usuario ou adiciona um usuario novo
function addOrUpdateUser(ip, id) {
  const user = userList.find(u => u.ip === ip);
  if (user) {
    user.id = id;
  } else {
    userList.push({ id, ip, nome: '', cor: ''});
  }
}


io.on('connection', (socket) => {
  const ipAdress = socket.handshake.address;
  console.log(`usuario de id "${socket.id}" conectou pelo ip ${ipAdress}`);

  addOrUpdateUser(ipAdress, socket.id);
  const currentUser = userList.find(u => u.ip === ipAdress);

  socket.emit('first_entry', currentUser);

  socket.on('change_name', (data) => {
    currentUser.nome = data[0] === null? currentUser.nome: data[0];
    currentUser.cor = data[1];
    console.log(`Tem ${userList.length} usuários conectados \n`, userList);
  })

  //Envio de mensagem
  socket.on('send', (text) => {
    chatLog.push(
      {
        name: currentUser.nome,
        color: currentUser.cor,
        ip: currentUser.ip,
        text: text
      }
    )
    userList.forEach(user => {
      io.to(user.id).emit('update', chatLog, currentUser.ip);
    })
  })

  console.log(userList);
});



server.listen(3000, () => {
  console.log(`Server online at http://${ip.address()}:3000`);
});