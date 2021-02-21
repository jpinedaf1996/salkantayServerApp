const router = require('express').Router();
const { Promociones } = require('../../dbconfig')

//Se crean las rutas para una API REST con los diferente metodos

router.get('/', async (req, res) => {
    let promo = await Promociones.findAll({
        order: [
            ['PromoId', 'DESC']
        ]
    });
    res.json(promo);
});
router.get('/activas', async (req, res) => {
    let promo = await Promociones.findAll({
        order: [
            ['PromoId', 'DESC']
        ],where: {
            estado: '1'
        }
    });
    res.json(promo);
});
router.post('/', async (req, res) => {
    await Promociones.create(req.body);

    res.json({ success: 'Se ha guardado con exito.' });
});
router.put('/:promoId', async (req, res) => { //estas rutas reciben parametros
    await Promociones.update(req.body, { // funcion para actualizar
        where: {
            promoId: req.params.promoId
        }
    });
    res.json({ success: 'Se ha actualizado un registro.' });

});

router.get('/findOne/:promoId', async (req, res) => {
    let promo = await Promociones.findOne({
        where: {
            promoId: req.params.promoId
        }
    });
    res.json(promo);
});
router.delete('/:promoId', async (req, res) => { //estas rutas reciben parametros
    await Promociones.destroy({ // funcion para borrar
        where: { promoId: req.params.promoId }
    });
    res.json({ success: 'Se ha borrado un registro.' });

});
module.exports = router;
