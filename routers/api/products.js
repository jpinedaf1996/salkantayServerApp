const router = require('express').Router();
const { Producto, Conexion, Promociones, Categoria } = require('../../dbconfig');
const upload = require('../middlewares/storage')
const { queryType, Sequelize } = require('sequelize');
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/ProdXCat', async (req, res) => { //Consulta para productos
    const ProductCat = await Conexion.query("select p.producto, p.precio, c.categoria AS Categoria, p.estado from productos p inner join categoria c ON p.categoriaId = c.categoriaId", { type: QueryTypes.SELECT });
    console.log(ProductCat)
    res.json(ProductCat);
});


router.get('/ProdMasV', async (req, res) => { //Consulta para productos mas vendidos Falta el WHERE o.fecha=CURDATE()
    const ProdMasV = await Conexion.query(`SELECT d.nombreProducto as Producto, SUM(d.unidades) AS Cantidad, ROUND(SUM(d.precio * d.unidades) , 2) AS Total, o.fecha AS Fecha FROM
    ordens o INNER JOIN ordendetalles d USING(ordenId)
    WHERE Fecha=CURDATE()
    GROUP BY Producto ORDER BY Cantidad DESC`, { type: QueryTypes.SELECT });
    //console.log(ProductCat)
    res.json(ProdMasV);
});

router.get('/VentasG', async (req, res) => { //Consulta para productos mas vendidos Falta el WHERE o.fecha=CURDATE()
    const VentasG = await Conexion.query(`SELECT o.ordenId, o.mesaId, o.tipo_orden, o.tipo_pago, o.descuento, o.total,
    o.cambio, o.fecha, o.hora FROM ordens o
    WHERE Fecha=CURDATE()
    ORDER BY ordenId ASC`, { type: QueryTypes.SELECT });
    //console.log(ProductCat)
    res.json(VentasG);
});

router.get('/VentasD', async (req, res) => { //Consulta para detalle de lo que se vendio Falta el WHERE o.fecha=CURDATE()
    const VentasD = await Conexion.query(`
    SELECT d.nombreProducto as Producto, d.unidades AS Cantidad, m.num_mesa AS Mesa, d.precio AS Precio, o.fecha AS Fecha, o.hora AS Hora
    FROM (ordens o INNER JOIN ordendetalles d USING(ordenId)) INNER JOIN mesas m USING(mesaId)
    WHERE o.fecha=CURDATE() ORDER BY Hora,Fecha DESC
    `, { type: QueryTypes.SELECT });
    // console.log(ProductCat)
    res.json(VentasD);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
