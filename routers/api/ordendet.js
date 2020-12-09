const router = require('express').Router();
const { OrdenDet,Producto,Orden } = require('../../dbconfig');
//Se crean las rutas para una API REST con los diferente metodos

router.get('/', async (req, res) => {
    console.log(req.ordendetId);
    let ordendet = await OrdenDet.findAll();
    res.json(ordendet);
});

router.post('/', async (req, res) => {
    let ordenDet = await OrdenDet.create(req.body);

    res.json(ordenDet);

});

router.get('/ordendetbyproducto/:id_orden', async (req, res) => {
    try {
        let ordendetbyproducto = await OrdenDet.findAll({
            where: {
                ordenId: req.params.id_orden
            },
            include: [
                {
                model: Producto
            }, 
            {
                model: Orden,
                attributes: ['descuento'],
                
            }
        ],
        });
        //console.log(ordendetbyproducto);
        res.json(ordendetbyproducto);
    } catch (error) {
        console.log("Error:" + error.message)
    }


});

router.put('/:ordendetId', async (req, res) => {
    await OrdenDet.update(
        {
            precio: parseFloat(req.body.precio),
            unidades: req.body.unidades
        },
        {
            where: { ordendetId: req.params.ordendetId } // funcion para actualizar
        });
    res.json({ success: 'Se ha actualizado un registro.' });
});

router.delete('/:ordendetId', async (req, res) => { //estas rutas reciben parametros
    await OrdenDet.destroy({ // funcion para borrar
        where: { ordendetId: req.params.ordendetId }
    });
    res.json({ success: 'Se ha borrado un registro.' });
});

module.exports = router; // se exporta el router hacia api.js
