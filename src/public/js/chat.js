// conenction
let socket = io(); // va a poder enviar los eventos al servidor.

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let inputMessage = document.getElementById('file-message');

let iniciar = document.getElementById('iniciar');
let nickname = document.getElementById('floatingInput');
let fotoPerfil = document.getElementById('file-imagen');
let outputFoto = document.getElementById('userFoto');

btn.addEventListener('click', function() {
    socket.emit('chat:message', { //nombramos el emit ("chat:message") y le enviamos un objeto
        message: message.value,
        username: username.value
    });
});

iniciar.addEventListener('click', function() {
    let file = inputFileMessage.files[0]
    if (file.type.indexOf('image') !== -1) {
        let reader = new window.FileReader()
        console.log("entro AQUI");
        reader.onload = event => {

            socket.emit('chat:login', { //nombramos el emit ("chat:message") y le enviamos un objeto
                nickname: nickname.value,
                fotoPerfil: event.target.result
            });
            inputMessage.value = ''
        }
        reader.readAsDataURL(file)
    }

});

message.addEventListener('keypress', function() {
    socket.emit('chat:typing', username.value);
});
// <a  id="userFoto" href="#!">User_1</a>

socket.on('chat:login', function(data) {
    //  actions.innerHTML = '';
    outputFoto.innerHTML += `
    <p>
    <a  id="nuevo" href="#!"><strong>${data.nickname}</strong></a>
    <img style='display:block; width:100px;height:100px;' id='base64image'                 
    src='${data.fotoPerfil}' />
  </p>`
});

socket.on('chat:message', function(data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
  </p>`
});

socket.on('new-message', function(data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: 
    <img style='display:block; width:100px;height:100px;' id='base64image'                 
       src='${data.message}' />
  </p>`
});

socket.on('chat:typing', function(data) {
    actions.innerHTML = `<p><em>${data} is typing a message...</em></p>`
});


const inputFileMessage = document.getElementById('file-message');

inputFileMessage.addEventListener('change', () => {
    let file = inputFileMessage.files[0]
    if (file.type.indexOf('image') !== -1) {
        let reader = new window.FileReader()
        console.log("entro AQUI");
        reader.onload = event => {
            let payload = {
                username: username.value,
                message: event.target.result,

            }

            socket.emit('new-message', payload)
            inputMessage.value = ''
        }
        reader.readAsDataURL(file)
    }
})