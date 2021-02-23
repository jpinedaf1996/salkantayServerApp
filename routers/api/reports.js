const router = require('express').Router();
const jwt = require('jwt-simple');
const moment = require('moment');
const { fraseAcceso } = require('../api/createToken');
const { QueryTypes } = require('sequelize');
const { OrdenDet, Orden, ticketVenta, Producto, Categoria, Info, Reports, Conexion } = require('../../dbconfig');

router.get('/precuenta/:TOKEN?/:ID', function (req, res, next) {

    //console.log('ID:', req.params.ID);

    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {

    try {
        let ordendetbyproducto = await OrdenDet.findAll({
            where: {
                ordenId: req.params.ID
            },
            include:
            {
                model: Orden,
                attributes: ['descuento', 'mesaId', 'fecha', 'hora'],

            }
        });

        //let info = await Info.findAll({});


        //const resu =  JSON.parse(ordenes)
        res.render('precuenta', { detalle: JSON.stringify(ordendetbyproducto) })
        // const html = `<h1>${req.params.ID}</h1>`;

        // res.send(html);

    } catch (error) {

        res.send(error.message)
    }


});

router.get('/ticket/:TOKEN?/:ID', function (req, res, next) {

    //console.log('ID:', req.params.ID);

    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {

    try {
        let ticket = await ticketVenta.findOne({
            where: {

                ordenId: req.params.ID
            },
            include:
            {
                model: Orden
            }
        });
        let detalle = await OrdenDet.findAll({
            where: {
                ordenId: req.params.ID
            }
        });
        let info = await Info.findAll({});

        let json = {
            empresa: JSON.parse(JSON.stringify(info)),
            headers: JSON.parse(JSON.stringify(ticket)),
            detalle: JSON.parse(JSON.stringify(detalle))
        };


        res.render('ticketventa', { detalle: JSON.stringify(json) });

    } catch (error) {

        res.send(error.message)
    }


});

////////////////////////////////////////////////////////////////////

router.get('/repProductoMas/:TOKEN?/:FECHA1?/:FECHA2', function (req, res, next) {


    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {

    /////////////////////////////////////////////

    console.log(req.params.FECHA1);
    console.log(req.params.FECHA2);

    try {

        const ProductMasV = await Conexion.query(`
        SELECT d.nombreProducto as Producto, SUM(d.unidades) AS Cantidad, ROUND(SUM(d.precio * d.unidades) , 2) AS Total, o.fecha AS Fecha FROM
        ordens o INNER JOIN ordendetalles d USING(ordenId)
         WHERE o.Fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' GROUP BY Producto ORDER BY Cantidad DESC`
            , { type: QueryTypes.SELECT });


        //const resu =  JSON.parse(ordenes)
        res.render('repProductoMas', { detalleM: JSON.stringify(ProductMasV) })
        // const html = `<h1>${req.params.ID}</h1>`;

        // res.send(html);

    } catch (error) {

        res.send(error.message)
    }


});



router.get('/repVentaDet/:TOKEN?/:FECHA1?/:FECHA2', function (req, res, next) {


    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {

    /////////////////////////////////////////////

    //console.log(req.params.FECHA1);
    // console.log(req.params.FECHA2);

    try {

        const RVentaDet = await Conexion.query(`SELECT d.nombreProducto as Producto, d.unidades AS Cantidad, m.num_mesa AS Mesa, d.precio AS Precio, o.fecha AS Fecha, o.hora AS Hora
        FROM (ordens o INNER JOIN ordendetalles d USING(ordenId)) INNER JOIN mesas m USING(mesaId)
        WHERE o.Fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' ORDER BY Hora,Fecha DESC
        `
            , { type: QueryTypes.SELECT });


        //const resu =  JSON.parse(ordenes)
        res.render('repVentaDet', { VentaDet: JSON.stringify(RVentaDet) })
        // const html = `<h1>${req.params.ID}</h1>`;

        // res.send(html);

    } catch (error) {

        res.send(error.message)
    }


});

router.get('/repProducto/:TOKEN?', function (req, res, next) {


    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {

    /////////////////////////////////////////////

    try {

        const ProductosL = await Conexion.query(`SELECT p.producto, p.precio, c.categoria AS Categoria, p.estado
        from productos p inner join categoria c ON p.categoriaId = c.categoriaId
        `
            , { type: QueryTypes.SELECT });


        //const resu =  JSON.parse(ordenes)
        res.render('repProducto', { ProdL: JSON.stringify(ProductosL) })
        // const html = `<h1>${req.params.ID}</h1>`;

        // res.send(html);

    } catch (error) {

        res.send(error.message)
    }


});


router.get('/repProductoMasDia/:TOKEN?', function (req, res, next) {


    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {

    /////////////////////////////////////////////

    try {

        const ProductMasVD = await Conexion.query(`
        SELECT d.nombreProducto as Producto, SUM(d.unidades) AS Cantidad, ROUND(SUM(d.precio * d.unidades) , 2) AS Total, o.fecha AS Fecha FROM
        ordens o INNER JOIN ordendetalles d USING(ordenId)
        WHERE o.fecha=CURDATE() GROUP BY Producto ORDER BY Cantidad DESC`
            , { type: QueryTypes.SELECT });


        //const resu =  JSON.parse(ordenes)
        res.render('repProductoMasDia', { detalleMD: JSON.stringify(ProductMasVD) })
        // const html = `<h1>${req.params.ID}</h1>`;

        // res.send(html);

    } catch (error) {

        res.send(error.message)
    }


});


router.get('/repVentaDetDia/:TOKEN?', function (req, res, next) {


    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {


    try {

        const RVentaDetD = await Conexion.query(`
        SELECT d.nombreProducto as Producto, d.unidades AS Cantidad, m.num_mesa AS Mesa, d.precio AS Precio, o.fecha AS Fecha, o.hora AS Hora
        FROM (ordens o INNER JOIN ordendetalles d USING(ordenId)) INNER JOIN mesas m USING(mesaId)
        WHERE o.fecha=CURDATE() ORDER BY Hora,Fecha DESC
        `
            , { type: QueryTypes.SELECT });


        res.render('repVentaDetDia', { VentaDetD: JSON.stringify(RVentaDetD) })


    } catch (error) {

        res.send(error.message)
    }


});

//////////////////////////////////////////// X y Z

router.get('/repX/:TOKEN?/:FECHA1?/:FECHA2', function (req, res, next) {


    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {


    try {

        //Apertura de turno
        const Apertura = await Conexion.query(`
        SELECT MIN(ordenId) AS minimo FROM ordens WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}'
        `
            , { type: QueryTypes.SELECT });

        //Cierre de turno
        const Cierre = await Conexion.query(`
        SELECT MAX(ordenId) AS maximo FROM ordens WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}'
        `
            , { type: QueryTypes.SELECT });

        //Ventas en efectivo
        const VentEfectivo = await Conexion.query(`
        SELECT SUM(total) AS ventasE FROM ordens WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' AND tipo_pago='e'
        `
            , { type: QueryTypes.SELECT });

        //Ventas con tarjeta
        const VentTarjeta = await Conexion.query(`
        SELECT SUM(total) AS ventasT FROM ordens WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' AND tipo_pago='t'
        `
            , { type: QueryTypes.SELECT });

        //Descuentos
        const Descuentos = await Conexion.query(`
        SELECT SUM(descuento) AS descuentoT FROM ordens WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}'
        `
            , { type: QueryTypes.SELECT });

        //Total de tickets generados o ventas realizadas
        const TickesGen = await Conexion.query(`
        SELECT COUNT(ordenID) TicketT FROM ordens WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}'
        `
            , { type: QueryTypes.SELECT });

        //Ventas Totales sin descuento
        const VentasTot = await Conexion.query(`
        SELECT SUM(total) AS TotalSin FROM ordens WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}'
        `
            , { type: QueryTypes.SELECT });

        //Ventas Totales con Descuento
        const VentasTotDes = await Conexion.query(`
        SELECT SUM(total-descuento) AS TotalCon FROM ordens WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}'
        `
            , { type: QueryTypes.SELECT });

        let reportex = {
            Apertura,
            Cierre,
            VentEfectivo,
            Descuentos,
            VentasTot,
            VentasTotDes,
            TickesGen,
            VentTarjeta
        };

        ////////////////////////////////////////////////////////

        res.render('repX', { reportex })
        r

    } catch (error) {

        res.send(error.message)
    }
});
/////////////////////////////////////////REPORTE X CURDATE///////////////////////////////
router.get('/repXDia/:TOKEN?', function (req, res, next) {


    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {


    try {

        //Apertura de turno
        const Apertura = await Conexion.query(`
        SELECT MIN(ordenId) AS minimo FROM ordens WHERE fecha=CURDATE()
        `
            , { type: QueryTypes.SELECT });

        //Cierre de turno
        const Cierre = await Conexion.query(`
        SELECT MAX(ordenId) AS maximo FROM ordens WHERE fecha=CURDATE()
        `
            , { type: QueryTypes.SELECT });

        //Ventas en efectivo
        const VentEfectivo = await Conexion.query(`
        SELECT SUM(total) AS ventasE FROM ordens WHERE fecha=CURDATE()
        `
            , { type: QueryTypes.SELECT });

        //Ventas con tarjeta
        const VentTarjeta = await Conexion.query(`
        SELECT SUM(total) AS ventasT FROM ordens WHERE fecha=CURDATE()
        `
            , { type: QueryTypes.SELECT });

        //Descuentos
        const Descuentos = await Conexion.query(`
        SELECT SUM(descuento) AS descuentoT FROM ordens WHERE fecha=CURDATE()
        `
            , { type: QueryTypes.SELECT });

        //Total de tickets generados o ventas realizadas
        const TickesGen = await Conexion.query(`
        SELECT COUNT(ordenID) TicketT FROM ordens WHERE fecha=CURDATE()
        `
            , { type: QueryTypes.SELECT });

        //Ventas Totales sin descuento
        const VentasTot = await Conexion.query(`
        SELECT SUM(total) AS TotalSin FROM ordens WHERE fecha=CURDATE()
        `
            , { type: QueryTypes.SELECT });

        //Ventas Totales con Descuento
        const VentasTotDes = await Conexion.query(`
        SELECT SUM(total-descuento) AS TotalCon FROM ordens WHERE fecha=CURDATE()
        `
            , { type: QueryTypes.SELECT });

        let reportexd = {
            Apertura,
            Cierre,
            VentEfectivo,
            Descuentos,
            VentasTot,
            VentasTotDes,
            TickesGen,
            VentTarjeta
        };

        ////////////////////////////////////////////////////////

        res.render('repXDia', { reportexd })
        r

    } catch (error) {

        res.send(error.message)
    }


});
//////////////////////////////////////////////////////////////////////////////////////////////
router.get('/repVentaGen/:TOKEN?/:FECHA1?/:FECHA2', function (req, res, next) {


    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {

    /////////////////////////////////////////////

    //console.log(req.params.FECHA1);
    // console.log(req.params.FECHA2);

    try {

        const RVentaGen = await Conexion.query(`SELECT o.ordenId, o.mesaId, o.tipo_orden, o.tipo_pago, o.descuento, o.total,
        o.cambio, o.fecha, o.hora FROM ordens o
        WHERE o.fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' ORDER BY ordenId ASC
        `
            , { type: QueryTypes.SELECT });


        //const resu =  JSON.parse(ordenes)
        res.render('repVentaGen', { VentaGen: JSON.stringify(RVentaGen) })
        // const html = `<h1>${req.params.ID}</h1>`;

        // res.send(html);

    } catch (error) {

        res.send(error.message)
    }


});

///////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/repVentaGenDia/:TOKEN?', function (req, res, next) {


    const token = req.params.TOKEN; // Se almacena el token en una variable

    let payload = {
        //Objeto basio
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token, fraseAcceso);

    } catch (error) {

        res.status(403).send({ error: 'El token es incorrecto' });

    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }

    req.usuarioId = payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {


    try {

        const RVentaGenDia = await Conexion.query(`
        SELECT o.ordenId, o.mesaId, o.tipo_orden, o.tipo_pago, o.descuento, o.total,
        o.cambio, o.fecha, o.hora FROM ordens o
        WHERE o.fecha=CURDATE() ORDER BY ordenId ASC
        `
            , { type: QueryTypes.SELECT });


        res.render('repVentaGenDia', { VentaGenD: JSON.stringify(RVentaGenDia) })


    } catch (error) {

        res.send(error.message)
    }


});
module.exports = router;
