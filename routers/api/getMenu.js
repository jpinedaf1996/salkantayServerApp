const router = require('express').Router();
const { Categoria, Orden,Producto, OrdenDet} = require('../../dbconfig')

//Se crean las rutas para una API REST con los diferente metodos

router.get('/categorias', async (req, res) => {
    let categorias = await Categoria.findAll({});
    res.json(categorias);
});

router.get('/detalles-orden/:ID', async (req, res) => {

  try {

      let ordendetbyproducto = await OrdenDet.findAll({
          where: {
              ordenId: req.params.ID
          }

      });

      res.json(ordendetbyproducto);

  } catch (error) {
      console.log("Error:" + error.message)
  }

});
router.get('/detalles-orden-total/:ID', async (req, res) => {

  try {

      let precio = await OrdenDet.findAll({
          attributes: ['precio'],
          where: {
              ordenId: req.params.ID
          }

      });
      let sumatoria = 0;

      JSON.parse(JSON.stringify(precio)).forEach((item) => {
        sumatoria = sumatoria + item.precio;
      });

      res.json(sumatoria);

  } catch (error) {
      console.log("Error:" + error.message)
  }

});

router.get('/productoporcategoria/:categoriaId', async (req, res) => {

    let productbycategory = await Producto.findAll({
        where: {
            categoriaId: req.params.categoriaId
        }
    });
    res.json(productbycategory);

});

router.delete('/delete/:ordendetId', async (req, res) => { //estas rutas reciben parametros
    await OrdenDet.destroy({ // funcion para borrar
        where: { ordendetId: req.params.ordendetId }
    });
    res.json({ success: 'Se ha borrado un registro.' });
});

module.exports = router; // se exporta el router hacia api.js
