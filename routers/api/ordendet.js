const router = require('express').Router();
const {OrdenDet}  =  require('../../dbconfig');
//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req,res)=>{ 
    console.log(req.ordendetId);
    let OrdenDet = await OrdenDet.findAll();
    res.json(ordendet);
});
router.get('/ordendetbyorden', async (req,res)=>{ 
    let ordendetbyorden = await OrdenDet.findAll({
        include:'orden'
    });
    res.json(ordendetbyorden);
});
router.get('/ordendetbyproducto', async (req,res)=>{ 
    let ordendetbyproducto = await OrdenDet.findAll({
        include:'producto'
    });
    res.json(ordendetbyproducto);
});
router.post('/', async (req,res)=>{
    try {
        let ordendet = await OrdenDet.create(req.body);
        res.json(orden);
    } catch (error) {
        res.json(error);
    }
});
router.put('/:ordendetId', async (req,res)=>{ //estas rutas reciben parametros 
    try {
        await OrdenDet.update(req.body,{ // funcion para actualizar 
            where: { ordendetId: req.params.ordendetId }
        });
        res.json({success: 'Se ha actualizado un registro.'});
    } catch (error) {
        res.json(error);
    }
});
router.delete('/:ordendetId', async (req,res)=>{ //estas rutas reciben parametros 
    try {
        await OrdenDet.destroy ({ // funcion para borrar 
            where: { ordendetId: req.params.ordendetId }
        });
        res.json({success: 'Se ha borrado un registro.'});
    } catch (error) {
        res.json(error)
    } 
});
module.exports = router; // se exporta el router hacia api.js