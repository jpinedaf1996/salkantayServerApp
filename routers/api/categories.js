
const router = require('express').Router();
const {Categoria}  =  require('../../dbconfig')

//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req,res)=>{ 
    let categorias = await Categoria.findAll({});
    res.json(categorias);
});

router.post('/', async (req,res)=>{
    let categorias = await Categoria.create(req.body);
    res.json(categorias);
});

router.put('/:categoriaId', async (req,res)=>{ //estas rutas reciben parametros 
    await Categoria.update(req.body,{ // funcion para actualizar 
        where: { categoriaId: req.params.categoriaId }
    });
    res.json({success: 'Se ha actualizado un registro.'});
    
});

router.delete('/:categoriaId', async (req,res)=>{ //estas rutas reciben parametros 
    await Categoria.destroy ({ // funcion para borrar 
        where: { categoriaId: req.params.categoriaId }
    });
    res.json({success: 'Se ha borrado un registro.'});
    
});

module.exports = router; // se exporta el router hacia api.js