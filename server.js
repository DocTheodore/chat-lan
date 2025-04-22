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




app.listen(port, () => {
  console.log(`Server online in http://${ip.address()}:${port}`);
});