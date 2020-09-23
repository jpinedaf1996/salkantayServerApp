const router = require('express').Router();
const {Cliente}  =  require('../../dbconfig')

//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', (req,res)=>{ 
    res.send('Funcionando');
});

router.get('/', async (req,res)=>{ 
    let cliente = await Test.findAll({});
    res.json(Cliente);
});

router.post('/', async (req,res)=>{
    let cliente = await Cliente.create(req.body);
    res.json(Cliente);
});

router.put('/:clienteId', async (req,res)=>{ //estas rutas reciben parametros 
    await Test.update(req.body,{ // funcion para actualizar 
        where: { TestId: req.params.mesaId }
    });
    res.json({success: 'Se ha actualizado un registro.'});
    
});

router.delete('/:clienteId', async (req,res)=>{ //estas rutas reciben parametros 
    await Mesa.destroy ({ // funcion para borrar 
        where: { clienteId: req.params.clienteId }
    });
    res.json({success: 'Se ha borrado un registro.'});
    
});

module.exports = router; // se exporta el router hacia api.js