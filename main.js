require('./dbconfig'); // Se llama la conexion de la dbconfig
const express = require('express');
const  app = express(); //Se hace una instancia de servidor
const bodyParser = require('body-parser');  // Se importan las librerias
const apiRouter = require('./routers/api-config');
const appRouter = require('./public/app-config');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); // Se configura el servidor para comunicacion por JSON
app.use(bodyParser.urlencoded({ extended: true })); // Permite recibir peteciones por PSOT
app.use('/apiv0.1', apiRouter); // RUTA Principal EJEM: localhost/apiv0.1/otrasrutas
app.use('/coffecode', appRouter); // RUTA Principal EJEM: localhost/apiv0.1/otrasrutas
app.use('/previews', express.static(path.join(__dirname, 'routers/public/uploads')));
app.use('/public', express.static(path.join(__dirname, '/public/views')));
app.use('/menu', express.static(path.join(__dirname, '/public/menu')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    
    res.render('index');

});


const server= app.listen(3000, () => {
    console.log("El servidor esta escuchando en el puerto 3000...")
});


const io = require('socket.io')(server);

io.on('connection',function (socket) {
    console.log("El socket esta conectado!"); 
    
    socket.emit('messages',{
        ms: 'Hola mundo'
    })

    socket.on('new-message',function (data) {
        
        io.sockets.emit('new-message-to-orden', data)

    })
 });
