const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const { Orden, Mesa, ticketVenta, OrdenDet, Conexion } = require('../../dbconfig');
//Se crean las rutas para una API REST con los diferente metodos

router.get('/', async (req, res) => {

    let ordenes = await Orden.findAll();
    res.json(ordenes);

});

//FUNCION PARA LLAMAR A LAS MESAS QUE ESTEN OCUPADAS OSEA ESTADO 1
//CON LA ORDEN ACTIVAS OSEA ESTADO 1
router.get('/ordenbymesa', async (req, res) => {

    let ordenbymesa = await Orden.findAll({
        include: {
            model: Mesa,
            where: { estado: '1' }
        },

        where: {
            estado: '1',
            tipo_orden: 'M'
        } // estado del orden activa
    });
    res.json(ordenbymesa);

});
router.get('/pendientes', async (req, res) => {
    try {

        let getOrden = await Orden.findAll({
            attributes: ['ordenId'],
            include: {
                model: Mesa,
            },
            where: {
                estado: '1',
                tipo_orden: 'P'
            } // estado del orden activa
        });

        let orden = JSON.parse(JSON.stringify(getOrden));


        res.json({orden});

    } catch (error) {

        console.log('error:'+error);
        res.json('error:'+error)
    }

});
router.get('/productos-en-orden-pendiente/:ID', async (req, res) => {

    try {
      let getDetalle = await OrdenDet.findAll({
          //attributes: ['ordenId'],
          include: {
              attributes: ['ordenId'],
              model: Orden,
              where: {
                  ordenId: req.params.ID,
                  estado: '1',
                  tipo_orden: 'P'
              }
          }

      });
        res.json(getDetalle);
    } catch (error) {
        console.log('Error: ' + error);
    }


});
router.get('/parallevar', async (req, res) => {

    let ordenbymesa = await Orden.findAll({
        where: {
            estado: '1',
            tipo_orden: 'L'
        } // estado del orden activa
    });
    res.json(ordenbymesa);

});


//DUNCION PARA CAMBIAR EL ESTADO DE UNA MESA Y AGREGAR UN ANUVEA ORDEN
//ESTA PASA HACER DE ESTADO 1 OSEA ACTIVA
router.put('/newOrden/:mesaId', async (req, res) => {
    //Se cambia el estado de la mesa
    if (req.body.estado === '0') {
        let response = await Mesa.update({
            'estado': '1'
        }, { // funcion para actualizar
            where: {
              mesaId: req.params.mesaId
            }
        });

        /**
        *SE CREA UN NUEVA ORDEN Y SE LE AÑADE LA MESA
        *QUE QUE SE LE CAMBIO EL ESTADOD
        **/

        if (response) {
            await Orden.create({
                'mesaId': req.params.mesaId
            });
            res.json({ success: 'Se ha creado la orden.' });
        }
    } else {
        res.json({ error: 'Error al crear la orden.' });
    }

});
router.post('/newOrden/llevar', async (req, res) => {
    //Se cambia el estado de la mesa
    await Orden.create({
        'tipo_orden': 'L'
    });
    res.json({ success: 'Se ha creado la orden.' });

});

///////
router.put('/descuento/:ordenId', async (req, res) => {
    //estas rutas reciben parametros
    await Orden.update({
        'descuento': req.body.descuento
    }, { // funcion para actualizar
        where: { ordenId: req.params.ordenId, }
    });
    //console.log(req.params.ordenId)

    res.json({ descuento: req.body.descuento });

});
router.put('/cancelorden/:ordenId', async (req, res) => {
    //estas rutas reciben parametros
    try {


        await Orden.update({
            'estado': req.body.estado
        }, { // funcion para actualizar
            where: { ordenId: req.params.ordenId }
        });


        await Mesa.update({
            'estado': '0'
        }, { // funcion para actualizar
            where: { mesaId: await getMesaId(req.params.ordenId) }
        });


        //console.log(await getMesaId(req.params.ordenId));
        res.status(202).send({ success: 'La orden ha sido cancelada!' });

    } catch (error) {

        res.status(500).send(error.message);

    }

});



router.put('/finalizarorden/:ordenId', async (req, res) => {
    //estas rutas reciben parametros
    try {
        switch (req.body.tipo_pago) {
            case 'e':
                if (parseFloat(req.body.efectivo) < 0 || (parseFloat(req.body.efectivo) < parseFloat(req.body.total))) {
                    return res.status(422).send({ error: 'Cantidad no valida!' });
                }
                /**
                 *
                 * Se cierra la orden
                 *
                 */
                await Orden.update({
                    'estado': req.body.estado, // El estado cero de una orden es guardada con exito aparece en el reporte
                    'tipo_pago': req.body.tipo_pago, // E es efectivo y T es tarrjeta
                    'total': req.body.total, // EL  total pagado en la factura
                    'efectivo': req.body.efectivo, // EL  total pagado en la factura
                    'cambio': req.body.cambio, // El cambio que se retiro de caja

                }, { // funcion para actualizar
                    where: { ordenId: req.params.ordenId }
                });
                /***
                                 *
                                 * Se actuliza la mesa 0
                                 *
                                 */

                await Mesa.update({
                    'estado': '0'
                }, { // funcion para actualizar
                    where: { mesaId: await getMesaId(req.params.ordenId) }
                });
                /***
                 *
                 * Creacion del ticket
                 *
                 */
                await ticketVenta.create({
                    'ordenId': req.params.ordenId
                });

                break;

            case 't':


                await Orden.update({
                    'estado': req.body.estado,
                    'total': req.body.total, // El estado cero de una orden es guardada con exito aparece en el reporte
                    'tipo_pago': req.body.tipo_pago // E es efectivo y T es tarrjeta

                }, { // funcion para actualizar
                    where: { ordenId: req.params.ordenId }
                });

                await Mesa.update({
                    'estado': '0'
                }, { // funcion para actualizar
                    where: { mesaId: await getMesaId(req.params.ordenId) }
                });
                /*
                 *
                 * Creacion del ticket
                 *
                 */
                await ticketVenta.create({
                    'ordenId': req.params.ordenId
                });
                break;

            default:
            // code block
        }
        //console.log(await getMesaId(req.params.ordenId));
        res.status(200).send({ success: 'La orden ha sido guardada con exito!' });

    } catch (error) {

        res.status(500).send(error.message);

    }

});

async function getMesaId(id) {

    let orden = await Orden.findOne({
        attributes: ['mesaId'],
        where: {
            ordenId: id
        }
    });
    //console.log(orden);
    return orden.mesaId;
}
module.exports = router; // se exporta el router hacia api.js
