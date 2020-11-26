const router = require('express').Router();
const { Cliente } = require('../../dbconfig')

//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req, res) => {
    let cliente = await Cliente.findAll({
        order: [
            ['clienteId', 'DESC']
        ]
    });
    res.json(cliente);
});
router.get('/findOne/:clienteId', async (req, res) => {
    let cliente = await Cliente.findOne({
        where: {
            clienteId: req.params.clienteId
        }
    });
    res.json(cliente);
});

router.post('/', async (req, res) => {
    await Cliente.create(req.body);
    
    res.json({ success: 'Se ha guardado con registro.' });
});

router.put('/:clienteId', async (req, res) => { //estas rutas reciben parametros 
    await Cliente.update(req.body, { // funcion para actualizar 
        where: {
            clienteId: req.params.clienteId
        }
    });
    res.json({ success: 'Se ha actualizado un registro.' });

});

router.delete('/:clienteId', async (req, res) => { //estas rutas reciben parametros 
    await Cliente.destroy({ // funcion para borrar 
        where: { clienteId: req.params.clienteId }
    });
    res.json({ success: 'Se ha borrado un registro.' });

});

module.exports = router; // se exporta el router hacia api.js