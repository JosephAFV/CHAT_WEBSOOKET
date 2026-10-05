const express = requir('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let usuariosConectados = 0;

io.on('connection', (socket) => {
    usuariosConectados++;

    console.log('Cliente conectado:', socket.id);

    io.emit('usuariosConectados', usuariosConectados);

    io.emit('notificacion', {
        texto: `Un usuario se ha conectado. ID: ${socket.id}`
    });

    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data.texto);

        io.emit('mensaje', {
            usuario: socket.id,
            texto: data.texto
        });
    });

    socket.on('escribiendo', () => {
        socket.broadcast.emit('escribiendo', {
            usuario: socket.id
        });
    });

    socket.on('dejoEscribir', () => {
        socket.broadcast.emit('dejoEscribir');
    });

    socket.on('disconnect', () => {
        usuariosConectados--;

        console.log('Cliente desconectado:', socket.id);

        io.emit('usuariosConectados', usuariosConectados);

        io.emit('notificacion', {
            texto: `Un usuario se ha desconectado. ID: ${socket.id}`
        });
    });
});

server.listen(3000, () => {
    console.log('Servidor ejecutandose en http://localhost:3000');
});