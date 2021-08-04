const path = require('path')
const express = require('express'); // servidor
const app = express();

// settings
app.set('port', process.env.PORT || 3000); // configuramos el puerto


// static files 
app.use(express.static(path.join(__dirname, '../public')));

// Route to Login Page
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '../public/login.html');
// });

// app.post('/login', (req, res) => {
//     // Insert Login Code Here
//     let username = req.body.username;
//     let password = req.body.password;
//     res.send(`Username: ${username} Password: ${password}`);
// });

// start the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//webSockets
const SocketIO = require('socket.io'); // hace la comunicacion bidireccional a travez de un servidor.
//Asignamos el servidor al socket
const io = SocketIO(server)


io.on('connection', (socket) => {
    console.log('new connection', socket.id); // ahora se le debe comunicar en el html q se ha conectado a un servidor
    socket.on('chat:message', (data) => {
        console.log(data);
        io.sockets.emit('chat:message', data); // emitir a todos, incluyendome
    });

    socket.on('new-message', (data) => {
        console.log(data);
        io.sockets.emit('new-message', data); // emitir a todos, incluyendome
    });

    socket.on('chat:login', (data) => {
        console.log(data);
        io.sockets.emit('chat:login', data); // emitir a todos, incluyendome
    });

    socket.on('chat:typing', (data) => {
        //console.log(data);
        socket.broadcast.emit('chat:typing', data); // emitir a todos excepto yo
    });
});