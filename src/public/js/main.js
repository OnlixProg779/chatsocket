const inputFileMessage = document.getElementById('file-message');

inputFileMessage.addEventListener('change', () => {
    let file = inputFileMessage.files[0]
    if (file.type.indexOf('image') !== -1) {
        let reader = new window.FileReader()
        reader.onload = event => {
            let payload = {
                id: idMessages,
                user: user.value,
                message: event.target.result,
                date: new Date()
            }
            socket.emit('new-message', payload)
            inputMessage.value = ''
        }
        reader.readAsDataURL(file)
    }
})