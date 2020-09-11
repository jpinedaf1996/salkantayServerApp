const router = require('express').Router();
const {Producto}  =  require('../../dbconfig');
//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req,res)=>{ 
    console.log(req.usuarioId);
    let productos = await Producto.findAll();
    res.json(productos);
});
router.get('/productbycategory', async (req,res)=>{ 
    let productbycategory = await Producto.findAll({
        include:'categorias'
    });
    res.json(productbycategory);
});
router.post('/', async (req,res)=>{
    try {
        let producto = await Producto.create(req.body);
        res.json(producto);
    } catch (error) {
        res.json(error);
    }
});
router.put('/:productId', async (req,res)=>{ //estas rutas reciben parametros 
    try {
        await Producto.update(req.body,{ // funcion para actualizar 
            where: { productoId: req.params.productId }
        });
        res.json({success: 'Se ha actualizado un registro.'});
    } catch (error) {
        res.json(error);
    }
});
router.delete('/:productId', async (req,res)=>{ //estas rutas reciben parametros 
    try {
        await Producto.destroy ({ // funcion para borrar 
            where: { productoId: req.params.productId }
        });
        res.json({success: 'Se ha borrado un registro.'});
    } catch (error) {
        res.json(error)
    } 
});
module.exports = router; // se exporta el router hacia api.js