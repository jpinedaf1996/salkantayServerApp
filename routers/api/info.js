const router = require('express').Router();
const { Info } = require('../../dbconfig');
const upload = require('../middlewares/storage')
const {QueryTypes} = require('sequelize');

//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req, res) => {
    let info = await Info.findAll({
    });
    res.json(info);
});
router.get('/findOne/:infoId', async (req, res) => {
    let info = await Info.findOne({
        where: {
            infoId: req.params.infoId
        }
    });
    res.json(info);
});

router.post('/', async (req, res) => {
    await Info.create(req.body);
    res.json({ success: 'Se ha guardado con registro.' });
});

router.put('/:infoId', async (req, res) => { //estas rutas reciben parametros 
    await Info.update(req.body, { // funcion para actualizar 
        where: {
            infoId: req.params.infoId
        }
    });
    res.json({ success: 'Se ha actualizado un registro.' });

});

router.delete('/:infoId', async (req, res) => { //estas rutas reciben parametros 
    await Info.destroy({ // funcion para borrar 
        where: { infoId: req.params.infoId }
    });
    res.json({ success: 'Se ha borrado un registro.' });

});

module.exports = router; // se exporta el router hacia api.js