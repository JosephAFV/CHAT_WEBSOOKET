const socket = io();

const mensajeInput = document.getElementById('mensajeInput');
const enviarBtn = document.getElementById('enviarBtn');
const mensajesDiv = document.getElementById('mensajes');
const usuariosTexto = document.getElementById('usuarios');
const escribiendoTexto = document.getElementById('escribiendo');

let tiempoEscritura;

enviarBtn.addEventListener('click', () => {
    const texto = mensajeInput.value.trim();

    if (texto !== '') {
        socket.emit('mensaje', {
            texto: texto
        });

        mensajeInput.value = '';
        socket.emit('dejoEscribir');
    }
});

mensajeInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        enviarBtn.click();
    }
});

mensajeInput.addEventListener('input', () => {
    socket.emit('escribiendo');

    clearTimeout(tiempoEscritura);

    tiempoEscritura = setTimeout(() => {
        socket.emit('dejoEscribir');
    }, 1000);
});

socket.on('mensaje', (data) => {
    const mensajeElemento = document.createElement('div');
    mensajeElemento.classList.add('mensaje');

    mensajeElemento.innerHTML = `
        <strong>${data.usuario}:</strong> ${data.texto}
    `;

    mensajesDiv.appendChild(mensajeElemento);
    mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
});

socket.on('usuariosConectados', (cantidad) => {
    usuariosTexto.textContent = `Usuarios conectados: ${cantidad}`;
});

socket.on('notificacion', (data) => {
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.textContent = data.texto;

    mensajesDiv.appendChild(notificacion);
    mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
});

socket.on('escribiendo', (data) => {
    escribiendoTexto.textContent = `${data.usuario} está escribiendo...`;
});

socket.on('dejoEscribir', () => {
    escribiendoTexto.textContent = '';
});