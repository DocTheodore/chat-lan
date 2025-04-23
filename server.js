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

io.on('connection', (socket) => {
  console.log(`usuario de id "${socket.id}" conectado`);

  userList.push({
    id: socket.id,
    ip: '',
    nome: ''
  });

  //Envio de mensagem
  socket.on('send', (text) => {
    chatLog.push({
      
    })
  })

});



app.listen(3000, () => {
  console.log(`Server online in http://${ip.address()}:3000`);
});