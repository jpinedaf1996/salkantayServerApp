const router = require('express').Router();
const { Categoria,Producto } = require('../../dbconfig')
// const { check, validationResult } = require('express-validator');
//Se crean las rutas para una API REST con los diferente metodos 

router.get('/categorias', async (req, res) => {
    let categorias = await Categoria.findAll({});
    res.json(categorias);
});


router.get('/productoporcategoria/:categoriaId', async (req, res) => {

    let productbycategory = await Producto.findAll({
        where: {
            categoriaId: req.params.categoriaId
        }
    });
    res.json(productbycategory);

});

module.exports = router; // se exporta el router hacia api.js