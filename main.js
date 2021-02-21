
/**

  Se requiren la librerias

**/

const express = require('express');
const app = express(); //Se hace una instancia de servidor
const bodyParser = require('body-parser');  // Se importan las librerias
const apiRouter = require('./routers/api-config');
const appRouter = require('./public/app-config');
const path = require('path');
const cors = require('cors');
const { Orden, Mesa , OrdenDet } = require('./dbconfig');// Se llama la conexion de la dbconfig


/**

  Configuracion basica del servidor

**/

app.use(cors());
app.use(bodyParser.json()); // Se configura el servidor para comunicacion por JSON
app.use(bodyParser.urlencoded({ extended: true })); // Permite recibir peteciones por PSOT
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

/**

  Se definen los ruoters del servidor

**/
app.use('/apiv0.1', apiRouter); // RUTA Principal EJEM: localhost/apiv0.1/otrasrutas
app.use('/coffecode', appRouter); // RUTA Principal EJEM: localhost/apiv0.1/otrasrutas
app.use('/previews', express.static(path.join(__dirname, 'routers/public/uploads')));

/**

  Se definesn archivos estaticos paginas, librerias ETC.

**/
app.use('/public', express.static(path.join(__dirname, '/public/views')));
app.use('/menu', express.static(path.join(__dirname, '/public/menu')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


/**

  Primera ruta de la aplicacacion INDEX

**/
app.get('/', async (req, res) => {

    res.render('index');

});

/**

  Ruta para entrar al MENU DIGITAL

**/

app.get('/menu/:ID', (req, res) => {

    res.render('menu', { mesa: req.params.ID });

});

/**

  Se ejecuta el servidor


**/

const server  = app.listen(3000, () => {
    console.log("El servidor esta escuchando en el puerto 3000...")
});

/**

  Comienza la configuacion del socket

**/

const io = require('socket.io')( server );

io.on('connection', function (socket) {

  let clients = [ ];



  socket.on('add-prod', async function (data) {

      /**
        * Regresa una respuesta con el evento que se va a recivir al cliente orden
       */
       try {

            await OrdenDet.create({
           'nombreProducto': data.producto.producto+`(${data.producto.desc})`,
           'precio': data.producto.precio,
           'unidades': 1,
           'ordenId':  data.ordenId,
         });


         io.sockets.emit('update-detalle', data.ordenId );
         io.sockets.to(socket.id).emit('update-detalle', data.ordenId );

         console.log(clients);

         return true

       } catch (e) {

         console.log('error: ' + e);

         return false
       }


  });

  socket.on('close-orden', async function (data) {

      /**
        * Regresa una respuesta con el evento que se va a recivir al cliente orden
       */
       try {

         const socketdb  = await Orden.findOne({
             attributes: ['socket'],
              where: { ordenId: data.data }
         });

         await Orden.update({
             'estado': '2'
         }, { // funcion para actualizar
             where: { ordenId: data.data }
         });

         io.sockets.to(socketdb.socket).emit("orden-canceled", "La orden fue cancelada por el administrador! <br> Consulte con su mesero Gracias." );
         return true
        // console.log("socket: "+ JSON.stringify(socketdb.socket));

       } catch (e) {


         console.log('error: ' + e);

         return false
       }


  });

  socket.on('save-orden', async function (data) {

    try {

        const result  = await Mesa.findOne({
             attributes: ['estado'],
             where: {
               mesaId: data.mesaId
             }
        });

        const sock  = await Orden.findOne({
             attributes: ['socket'],
             where: {
               ordenId: data.ordenId
             }
        });

        let state = JSON.parse(JSON.stringify(result));
        let ordenSocket = JSON.parse(JSON.stringify(sock));

        if( state.estado === '0' ){

          await Orden.update({
              'tipo_orden': 'M',
          }, { // funcion para actualizar
              where: { ordenId: data.ordenId }
          });

          await Mesa.update({
              'estado': '1'
          }, { // funcion para actualizar
              where: { mesaId: data.mesaId }
          });


          io.sockets.to(socket.id).emit("finished", {success: 'ok', data: '¿Decesa ir a cobrar la orden?' } );
          io.sockets.to(ordenSocket.socket).emit("finished-to-client", {data: 'La orden ha finalizado!' } );
          return false;

        }else {

          io.sockets.to(socket.id).emit("finished", {data: 'La mesa parece estar ya ocupada' } );
          return false;

        }


    } catch (error) {

        console.log(error);

    }


  });

  socket.on('delete-product', async function (data) {

      /**
        * Regresa una respuesta con el evento que se va a recivir al cliente orden
       */
       try {

         console.log(data);

         await OrdenDet.destroy({

             where: { ordendetId: data.detId }

         });

         const socketdb  = await Orden.findOne({
             attributes: ['socket'],
              where: { ordenId: data.ordenId }
         });

         io.sockets.to(socketdb.socket).emit("response-delete-to-client", data.value );

         io.sockets.emit('delete-response', { id: data.ordenId });

         return true

       } catch (e) {


         console.log('error: ' + e);

         return false
       }


  });
    //console.log(socket.id);

    //io.sockets.to(socket.id).emit("welcome", socket.id );

    socket.emit('get-socketId', {id: socket.id});
    /**
     * RESIVE EL MENSAJE DEL CLIENTE CON EL NOMBRE NEW-MENSAJE
     */
    socket.on('open-orden', async function (data) {
        /*
        * Regresa una respuesta con el evento que se va a recivir al cliente orden
        */
        if (data) {
            try {

                const orden = await Orden.findOne({
                    attributes: ['ordenId'],
                    where: {
                        mesaId: data.data,
                        estado: '1',
                        tipo_orden : 'P'
                    }
                });

                if (JSON.stringify(orden) === 'null') {
                    /***
                     * Se detecto que la mesa ya esta ocupada
                     */
                    const orden = await Orden.create({ 'mesaId': data.data, 'tipo_orden': 'P', 'socket': socket.id });

                    io.sockets.to(socket.id).emit("orden-created", {orden: orden.ordenId, mesaId:  orden.mesaId} );

                    io.sockets.emit('update-orden', { DATA: 'Se ha creado una nueva orden en la mesa: ' + data.data });

                    return false

                } else {

                    await Orden.update({
                        'socket': socket.id
                    }, { // funcion para actualizar
                        where: {
                          ordenId : data.ordenId
                        }
                    });

                    io.sockets.to(socket.id).emit("error-table", "Ya hay una orden creada en esa mesa, se atendera en breve" );
                    //await Orden.update({  'socket': data.socket,  where { ordenId : data.ordenId} } );
                    //io.sockets.emit('update-orden', { DATA: 'Ocurrio un error la mesa aparece ocuapada: ' + data.data });

                    return false
                }

            } catch (error) {

                console.log('Error: ' + error);

            }
        }

    })

    //console.log("Un usuario se ha conectado al socket");
});
