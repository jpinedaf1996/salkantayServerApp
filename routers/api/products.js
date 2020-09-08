
const router = require('express').Router();

//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', (req,res)=>{ // 
    res.json(
        req.body.nombre
    );
});

router.post('/', (req,res)=>{
    res.send(req.body.nombre);
});

router.put('/:productId', (req,res)=>{ //estas rutas reciben parametros
    res.json(
        req.params.productId
    );
    
});

router.delete('/:productId', (req,res)=>{
    res.json(
        req.params.productId
    );
});

module.exports = router; // se exporta el router hacia api.js