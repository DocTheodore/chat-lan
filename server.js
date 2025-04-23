const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const ip = require('ip');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

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



app.listen(port, () => {
  console.log(`Server online in http://${ip.address()}:${port}`);
});