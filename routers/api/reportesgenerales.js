const router = require('express').Router();
const { Conexion } = require('../../dbconfig');
const moment = require('moment');

const { QueryTypes,Sequelize } = require('sequelize');


let now = moment().format('YYYY-MM-DD');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/ProdXCat', async (req, res) => { //Consulta para productos
    const ProductCat = await Conexion.query("select p.producto, p.precio, c.categoria AS Categoria, p.estado from productos p inner join categoria c ON p.categoriaId = c.categoriaId", { type: QueryTypes.SELECT });
   // console.log(ProductCat)
    res.json(ProductCat);
});


router.get('/ProdMasV', async (req, res) => { //Consulta para productos mas vendidos Falta el WHERE o.fecha=CURDATE()
    $sql = `SELECT d.nombreProducto as Producto, SUM(d.unidades) AS Cantidad, ROUND(SUM(d.precio * d.unidades) , 2) AS Total, o.fecha AS Fecha 
    FROM ordens o INNER JOIN ordendetalles d USING(ordenId) WHERE Fecha = '${now}' AND o.estado='0' GROUP BY Producto ORDER BY Cantidad DESC;`;
    try {
        const ProdMasV = await Conexion.query($sql, { type: QueryTypes.SELECT });
        //console.log(ProdMasV)
        return res.json(ProdMasV);

    } catch (error) {
        console.log(error.message);
    }
});

router.get('/filtrarporfechas/:FECHA1?/:FECHA2', async (req, res) => { //Consulta para productos mas vendidos Falta el WHERE o.fecha=CURDATE()

    $sql = `SELECT d.nombreProducto as Producto, SUM(d.unidades) AS Cantidad, ROUND(SUM(d.precio * d.unidades) , 2) AS Total, o.fecha AS Fecha FROM
    ordens o INNER JOIN ordendetalles d USING(ordenId)
    WHERE o.Fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' AND o.estado='0' GROUP BY Producto ORDER BY Cantidad DESC`;

    try {
        const ProdMasV = await Conexion.query($sql, { type: QueryTypes.SELECT });
        
        return res.json(ProdMasV);

    } catch (error) {
        console.log(error.message);
    
    }
    
});

router.get('/filtrarporfechasventas/:FECHA1?/:FECHA2', async (req, res) => { //Consulta para productos mas vendidos Falta el WHERE o.fecha=CURDATE()

    $sql = `SELECT ordens.*, ticketventa.tikectId FROM ticketventa inner join ordens using (ordenId)
    WHERE ordens.fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' AND estado='0' ORDER BY ordenId ASC`;

    try {
        const ventas = await Conexion.query($sql, { type: QueryTypes.SELECT });
        
        return res.json(ventas);

    } catch (error) {
        console.log(error.message);
    
    }
    
});

router.get('/VentasG', async (req, res) => { //Consulta para productos mas vendidos Falta el WHERE o.fecha=CURDATE()

    const VentasG = await Conexion.query(`SELECT ordens.*, ticketventa.tikectId 
    FROM ticketventa inner join ordens using (ordenId) 
    WHERE ordens.fecha = '${now}' AND estado='0' ORDER BY ordenId ASC`, { type: QueryTypes.SELECT });
    
    res.json(VentasG);
});

router.get('/VentasD', async (req, res) => { //Consulta para detalle de lo que se vendio Falta el WHERE o.fecha=CURDATE()
    const VentasD = await Conexion.query(`
    SELECT d.nombreProducto as Producto, d.unidades AS Cantidad, m.num_mesa AS Mesa, d.precio AS Precio, o.fecha AS Fecha, o.hora AS Hora
    FROM (ordens o INNER JOIN ordendetalles d USING(ordenId)) INNER JOIN mesas m USING(mesaId)
    WHERE Fecha='${now}' ORDER BY Hora,Fecha DESC
    `, { type: QueryTypes.SELECT });
    // console.log(ProductCat)
    res.json(VentasD);
});
///////////////////////////////////////////////////////REPORTES DE CAJA/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////DIARIO//////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/RCajaG', async (req, res) => { //Consulta para reporte de caja dia
    $sql = `SELECT SUM(descuento) AS descuentoT,
    COUNT(ordenID) as TicketTG, SUM(total) AS TotalSin, SUM(total-descuento) AS TotalConG  
   FROM ordens WHERE fecha = '${now}' AND estado='0' `;
    try {
        const RCajaG = await Conexion.query($sql, { type: QueryTypes.SELECT });
        
        return res.json(RCajaG);

    } catch (error) {
        console.log(error.message);
    }
});

router.get('/RCajaE', async (req, res) => { //Consulta para reporte de caja dia
    $sql = `SELECT SUM(total) AS ventasEE, COUNT(ordenID) as TicketTE FROM ordens WHERE fecha = '${now}' AND estado='0' AND tipo_pago='e' `;
    try {
        const RCajaE = await Conexion.query($sql, { type: QueryTypes.SELECT });
        //console.log(ProdMasV)
        return res.json(RCajaE);

    } catch (error) {
        console.log(error.message);
    }
});


router.get('/RCajaT', async (req, res) => { //Consulta para reporte de caja dia
    $sql = `SELECT SUM(total) AS ventasTT, COUNT(ordenID) as TicketTT FROM ordens WHERE fecha = '${now}' AND estado='0' AND tipo_pago='t' `;
    try {
        const RCajaT = await Conexion.query($sql, { type: QueryTypes.SELECT });
        //console.log(ProdMasV)
        return res.json(RCajaT);

    } catch (error) {
        console.log(error.message);
    }
});
/////////////////////////////////////////////////////////////INTERVALOS/////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/filtrarporfechasCajaG/:FECHA1?/:FECHA2', async (req, res) => { //Consulta para reporte de caja intervalo General

    $sql = ` SELECT SUM(descuento) AS descuentoT,
    COUNT(ordenID) as TicketT, SUM(total) AS TotalSin, SUM(total-descuento) AS TotalCon  
   FROM ordens WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' AND estado='0' `;

    try {
        const RepCajaG = await Conexion.query($sql, { type: QueryTypes.SELECT });
        
        return res.json(RepCajaG);

    } catch (error) {
        console.log(error.message);
    
    }
    
});

router.get('/filtrarporfechasCajaE/:FECHA1?/:FECHA2', async (req, res) => { //Consulta para reporte de caja intervalo Efectivo

    $sql = ` SELECT SUM(total) AS ventasE, COUNT(ordenID) as TicketTE FROM ordens 
    WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' 
    AND tipo_pago='e' AND estado='0' `;

    try {
        const RepCajaE = await Conexion.query($sql, { type: QueryTypes.SELECT });
        
        return res.json(RepCajaE);

    } catch (error) {
        console.log(error.message);
    
    }
    
});

router.get('/filtrarporfechasCajaT/:FECHA1?/:FECHA2', async (req, res) => { //Consulta para reporte de caja intervalo Tarjeta

    $sql = ` SELECT SUM(total) AS ventasT, COUNT(ordenID) as TicketTT FROM ordens 
    WHERE fecha BETWEEN '${req.params.FECHA1}' AND '${req.params.FECHA2}' 
    AND tipo_pago='t' AND estado='0' `;

    try {
        const RepCajaT = await Conexion.query($sql, { type: QueryTypes.SELECT });
        
        return res.json(RepCajaT);

    } catch (error) {
        console.log(error.message);
    
    }
    
});

module.exports = router;