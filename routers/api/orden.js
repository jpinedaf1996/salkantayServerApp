const router = require('express').Router();
const { Orden, Mesa } = require('../../dbconfig');
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
        where: { estado: '1' } // estado del orden activa
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
            where: { mesaId: req.params.mesaId }
        });
        //SE CREA UN NUEVA ORDEN Y SE LE AÑADE LA MESA 
        //QUE QUE SE LE CAMBIO EL ESTADOD
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
///////
router.put('/descuento/:ordenId', async (req, res) => { 
    //estas rutas reciben parametros 
    await Orden.update({
        'descuento': req.body.descuento
    }, { // funcion para actualizar
        where: { ordenId: req.params.ordenId }
    });
    //console.log(req.params.ordenId)

    res.json({ descuento: req.body.descuento });

});

module.exports = router; // se exporta el router hacia api.js
