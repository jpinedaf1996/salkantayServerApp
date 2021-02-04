var socket = io.connect('http://localhost:3000',{'forceNew' : true});

socket.on('messages',function (data) {
    console.log(data);
})

function sendMessage(e) {

    socket.emit('new-message',{data:'hola desde el cliente'})
    return false;
}