const express = require('express');
const bodyParser = require('body-parser');  // Se importan las librerias
const apiRouter = require('./routers/api');
const cors = require('cors')
require('./dbconfig'); // Se llama la conexion de la dbconfig

const app = express(); //Se hace una instancia de servidor

app.use(cors());
app.use(bodyParser.json()); // Se configura el servidor para comunicacion por JSON
app.use(bodyParser.urlencoded({extended : true })); // Permite recibir peteciones por PSOT

app.use('/apiv0.1',apiRouter); // RUTA Principal EJEM: localhost/apiv0.1/otrasrutas

app.listen(3000, () => console.log("El servidor esta escuchando en el puerto 3000..."));

