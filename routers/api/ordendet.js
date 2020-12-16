const router = require('express').Router();
const { OrdenDet } = require('../../dbconfig');
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
    let ordendetbyproducto = await OrdenDet.findAll({
        include: 'producto',
        where: { ordenId: req.params.id_orden }
    });
    res.json(ordendetbyproducto);
});

router.put('/:ordendetId', async (req, res) => {
    console.log(parseFloat(req.body.precio));//estas rutas reciben parametros
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
