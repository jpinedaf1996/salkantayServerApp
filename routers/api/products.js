
const router = require('express').Router();
const {Producto}  =  require('../../dbconfig')

//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req,res)=>{ // 
    let producto = await Producto.findAll();
    res.json(producto);
});

router.post('/', async (req,res)=>{
    let producto = await Producto.create(req.body);
    res.json(producto);
});

router.put('/:productId', async (req,res)=>{ //estas rutas reciben parametros 
    await Producto.update(req.body,{ // funcion para actualizar 
        where: { idProducto: req.params.productId }
    });
    res.json({success: 'Se ha actualizado un registro.'});
    
});

router.delete('/:productId', async (req,res)=>{ //estas rutas reciben parametros 
    await Producto.destroy ({ // funcion para borrar 
        where: { idProducto: req.params.productId }
    });
    res.json({success: 'Se ha borrado un registro.'});
    
});

module.exports = router; // se exporta el router hacia api.js