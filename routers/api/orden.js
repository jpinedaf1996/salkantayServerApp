const router = require('express').Router();
const {Orden}  =  require('../../dbconfig');
//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req,res)=>{ 
    console.log(req.ordenId);
    let Orden = await Orden.findAll();
    res.json(orden);
});
router.get('/ordenbycliente', async (req,res)=>{ 
    let ordenbycliente = await Orden.findAll({
        include:'cliente'
    });
    res.json(ordenbycliente);
});
router.get('/ordenbymesa', async (req,res)=>{ 
    let ordenbymesa = await Orden.findAll({
        include:'mesa'
    });
    res.json(ordenbymesa);
});
router.post('/', async (req,res)=>{
    try {
        let orden = await Orden.create(req.body);
        res.json(orden);
    } catch (error) {
        res.json(error);
    }
});
router.put('/:ordenId', async (req,res)=>{ //estas rutas reciben parametros 
    try {
        await Orden.update(req.body,{ // funcion para actualizar 
            where: { ordenId: req.params.ordenId }
        });
        res.json({success: 'Se ha actualizado un registro.'});
    } catch (error) {
        res.json(error);
    }
});
router.delete('/:ordenId', async (req,res)=>{ //estas rutas reciben parametros 
    try {
        await Orden.destroy ({ // funcion para borrar 
            where: { ordenId: req.params.ordenId }
        });
        res.json({success: 'Se ha borrado un registro.'});
    } catch (error) {
        res.json(error)
    } 
});
module.exports = router; // se exporta el router hacia api.js