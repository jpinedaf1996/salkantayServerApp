const express = require('express');
const bodyParser = require('body-parser');  // Se importan las librerias
const apiRouter = require('./routers/api-config');
const appRouter = require('./public/app-config');
const path = require('path');
const cors = require('cors')


// ⇨ 'html'

require('./dbconfig'); // Se llama la conexion de la dbconfig

const app = express(); //Se hace una instancia de servidor

app.use(cors());
app.use(bodyParser.json()); // Se configura el servidor para comunicacion por JSON
app.use(bodyParser.urlencoded({ extended: true })); // Permite recibir peteciones por PSOT

app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

app.use('/apiv0.1', apiRouter); // RUTA Principal EJEM: localhost/apiv0.1/otrasrutas
app.use('/coffecode', appRouter); // RUTA Principal EJEM: localhost/apiv0.1/otrasrutas


app.use('/previews', express.static(path.join(__dirname, 'routers/public/uploads')));
app.use('/public', express.static(path.join(__dirname, '/public/views')));

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));




app.listen(3000, () => {
    console.log("El servidor esta escuchando en el puerto 3000...")
});

