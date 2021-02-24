const router = require('express').Router();
const { Producto, Promociones, Categoria } = require('../../dbconfig');
const upload = require('../middlewares/storage')
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

//Se crean las rutas para una API REST con los diferente metodos

router.get('/', async (req, res) => {


    console.log(req.usuarioId);
    let productos = await Producto.findAll({
        include: {
            model: Promociones
        }
    });
    res.json(productos);


});

router.get('/productossinpromocion/:categoriaId', async (req, res) => {

    let result = await Producto.findAll({
        where: {
            categoriaId: req.params.categoriaId,
            promoId: '1'
        }
    });

    res.json(result);

});
router.get('/productosenpromocion/:promoId', async (req, res) => {

    try {
        let result = await Producto.findAll({
            include: {
                model: Categoria
            },
            where: {
                promoId: req.params.promoId,
            }
        });

        res.json(result);
    } catch (error) {
        console.log(error.message);

    }

});

router.get('/productosBycategori/:categoriaId', async (req, res) => {

    let productbycategory = await Producto.findAll({
        include: {
            model: Promociones
        },
        where: {
            categoriaId: req.params.categoriaId
        }
    });
    let result = JSON.parse(JSON.stringify(productbycategory));

    result.map((item, i) => {
        //console.log(json[i]);

        result[i].precio = parseFloat(item.precio - (item.precio * item.promocione.valor)).toFixed(2)

    });

    //console.log(result)

    res.json(result);

});

router.get('/findOne/:productoId', async (req, res) => {

    let producto = await Producto.findOne({
        where: {
            productoId: req.params.productoId
        }
    });
    res.json(producto);

});

router.post('/', upload.single('image'), async (req, res) => {
    if (req.file != undefined) {
        const producto = await Producto.create(
            {
                'producto': req.body.producto,
                'precio': req.body.precio,
                'categoriaId': req.body.categoriaId,
                'desc': req.body.desc,
                'imagen': req.file.filename

            }
        );
        return res.json(producto);
    } else {
        req.body.imagen = "logo.jpg";
        const producto = await Producto.create(req.body);
        return res.json(producto);
    }

});
router.put('/:productId', upload.single('image'), async (req, res) => { //estas rutas reciben parametros
    // funcion para actualizar
    if (req.file != undefined) {
        await Producto.update(
            {
                'producto': req.body.producto,
                'precio': req.body.precio,
                'categoriaId': req.body.categoriaId,
                'desc': req.body.desc,
                'imagen': req.file.filename

            }, {
            where: { productoId: req.params.productId }
        });

    } else {
        await Producto.update(req.body, {
            where: { productoId: req.params.productId }
        });

    }

    return res.status(200).json(
        {
            success: 'Se actualizo de forma correcta!'
        }
    );
});

router.delete('/:productId', async (req, res) => { //estas rutas reciben parametros

    await Producto.destroy({ // funcion para borrar
        where: { productoId: req.params.productId }
    });
    res.json({ success: 'Se ha borrado un registro.' });

});

module.exports = router; // se exporta el router hacia api.js
