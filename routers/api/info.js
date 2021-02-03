const router = require('express').Router();
const { Informacion } = require('../../dbconfig')

//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req, res) => {
    let info = await Informacion.findAll({
    });
    res.json(info);
});
router.get('/findOne/:infoId', async (req, res) => {
    let info = await Informacion.findOne({
        where: {
            infoId: req.params.infoId
        }
    });
    res.json(info);
});

router.post('/', async (req, res) => {
    await Informacion.create(req.body);
    res.json({ success: 'Se ha guardado con registro.' });
});

router.put('/:infoId', async (req, res) => { //estas rutas reciben parametros 
    await Informacion.update(req.body, { // funcion para actualizar 
        where: {
            infoId: req.params.infoId
        }
    });
    res.json({ success: 'Se ha actualizado un registro.' });

});

router.delete('/:infoId', async (req, res) => { //estas rutas reciben parametros 
    await Informacion.destroy({ // funcion para borrar 
        where: { infoId: req.params.infoId }
    });
    res.json({ success: 'Se ha borrado un registro.' });

});

module.exports = router; // se exporta el router hacia api.js