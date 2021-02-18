const router = require('express').Router();
const { OrdenDet, Producto, Orden } = require('../../dbconfig');
//Se crean las rutas para una API REST con los diferente metodos

router.get('/', async (req, res) => {

    let ordendet = await OrdenDet.findAll();
    res.json(ordendet);
});

router.post('/', async (req, res) => {
    try {   // try {

        let detalle = await OrdenDet.findOne({
            where: {
                nombreProducto: req.body.nombreProducto,
                ordenId: req.body.ordenId
            }
        });

        if (detalle != null) {

            try {

                await OrdenDet.update(
                    {
                        unidades: detalle.unidades + 1
                    },
                    {
                        where: { ordendetId: detalle.ordendetId } // funcion para actualizar
                    });

                res.json({ success: "Actualizado con exito" });

            } catch (error) {

                res.json(error.message);
            }

        } else {

            try {

                await OrdenDet.create(req.body);

                res.json({ success: "Agregado con exito" });

            } catch (error) {

                res.json(error.message);
            }

        }


    } catch (error) {

        console.log(error.message)
    }


});

router.get('/ordendetbyproducto/:id_orden', async (req, res) => {

    try {
        let ordendetbyproducto = await OrdenDet.findAll({
            where: {
                ordenId: req.params.id_orden
            },
            include:
            {
                model: Orden,
                attributes: ['descuento'],

            }
        });

        res.json(ordendetbyproducto);
        
    } catch (error) {
        console.log("Error:" + error.message)
    }


});

router.put('/:ordendetId', async (req, res) => {

    try {

        var detalle = await OrdenDet.findOne({
            where: {
                ordendetId: req.params.ordendetId
            }
        });

        switch (req.body.op) {

            case 'add':
                await OrdenDet.update(
                    {
                        unidades: detalle.unidades + 1
                    },
                    {
                        where: { ordendetId: req.params.ordendetId } // funcion para actualizar
                    });
                res.json({ success: "Se actualizo con exito!" });
                break;

            case 'remove':

                if (detalle.unidades > 1) {

                    await OrdenDet.update(
                        {
                            unidades: detalle.unidades - 1
                        },
                        {
                            where: { ordendetId: req.params.ordendetId } // funcion para actualizar
                        });

                    res.json({ success: "Se actualizo con exito!" });
                } else {

                    res.json({ error: "No se puede quitar mas productos! Click en borro" });
                }

                break;
        }

    } catch (error) {

        console.log(error.message)

    }

});

router.delete('/:ordendetId', async (req, res) => { //estas rutas reciben parametros
    await OrdenDet.destroy({ // funcion para borrar
        where: { ordendetId: req.params.ordendetId }
    });
    res.json({ success: 'Se ha borrado un registro.' });
});

module.exports = router; // se exporta el router hacia api.js
