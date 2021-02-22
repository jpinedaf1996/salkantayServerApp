const router = require('express').Router();
const { Producto,Promociones } = require('../../dbconfig')
const {queryType , Sequelize} = require('sequelize');
const Op = Sequelize.Op;

//Se crean las rutas para una API REST con los diferente metodos

router.get('/', async (req, res) => {
    let promo = await Promociones.findAll({
        order: [
            ['PromoId', 'DESC']
        ],where:{
          promoId :{
              [Op.gt]: 1
            },
        }

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
router.put('/descuentoporproducto/:promoId', async (req, res) => { //estas rutas reciben parametros


  let promo = await Promociones.findOne({
      where: {
          promoId: req.params.promoId
      }
  });

  const validarEstado = JSON.parse(JSON.stringify(promo));

  if(validarEstado.estado === '1'){

    const listToAdd = req.body.data.split(","); //estas rutas reciben parametros
    // var errores = 0;
    for (let i = 0; i < listToAdd.length; i++) {

      console.log(parseInt(listToAdd[i]));

        try {
            await Producto.update({ // funcion para borrar
                promoId: req.params.promoId

            },{where: { productoId: parseInt(listToAdd[i]) }});

        } catch (error) {
            // errores = errores + 1;
            console.log(error.message);
        }
    }
  }else {
    return res.status(422).json({ error: 'La orden se encuentra inactiva.' });
  }

    // if (errores > 0) {
    //     return res.status(422).json(
    //         {
    //             cant: errores,
    //             errores: 'Verifique que las categorias no tengan productos'
    //         }
    //     );
    // }

    return res.status(200).json({ success: 'Se han actualizado las promociones con exito!' });


});


router.put('/:promoId', async (req, res) => { //estas rutas reciben parametros

    let promo = await Promociones.findOne({
        where: {
            promoId: req.params.promoId
        }
    });

    const validarEstado = JSON.parse(JSON.stringify(promo));

    if(validarEstado.estado === '1'){
      await Producto.update({promoId: 1},{ // funcion para actualizar

          where: {
              promoId: req.params.promoId
          }
      });
    }

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
