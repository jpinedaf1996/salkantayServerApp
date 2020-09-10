
const router = require('express').Router();
const {Usuarios}  =  require('../../dbconfig')

//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req,res)=>{ // 
    let usuarios = await Usuarios.findAll();
    res.json(usuarios);
});

router.post('/', async (req,res)=>{
    let usuarios = await Usuarios.create(req.body);
    res.json(usuarios);
});

router.put('/:usuarioId', async (req,res)=>{ //estas rutas reciben parametros 
    await Usuarios.update(req.body,{ // funcion para actualizar 
        where: { usuarioId: req.params.usuarioId }
    });
    res.json({success: 'Se ha actualizado un registro.'});
    
});

router.delete('/:usuarioId', async (req,res)=>{ //estas rutas reciben parametros 
    await Usuarios.destroy ({ // funcion para borrar 
        where: { usuarioId: req.params.usuarioId }
    });
    res.json({success: 'Se ha borrado un registro.'});
    
});

module.exports = router; // se exporta el router hacia api.js