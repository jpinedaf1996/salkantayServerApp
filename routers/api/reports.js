const router = require('express').Router();
const jwt = require('jwt-simple');
const moment = require('moment');
const { fraseAcceso } = require('../api/createToken');
const { Orden, Mesa } = require('../../dbconfig');

router.get('/precuenta/:TOKEN', function (req, res, next) {
    
    //console.log('ID:', req.params.ID);

    const token = req.params.TOKEN; // Se almacena el token en una variable 

    let payload = {
        //Objeto basio 
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {

        payload = jwt.decode(token,fraseAcceso);

    }catch (error) {
        
        res.status(403).send({ error: 'El token es incorrecto' });
        
    }
    if (payload.expireAt < moment().unix()) {

        res.status(403).send({ error: 'El token expiro' });

    }
    
    req.usuarioId =  payload.usuarioId;
    //console.log(payload.usuarioId);
    next();
}, async function (req, res) {

    try { 
        
        //const resu =  JSON.parse(ordenes)
        res.render('precuenta')
        // const html = `<h1>${req.params.ID}</h1>`;

        // res.send(html);
    
    } catch (error) {
    
        res.send(error.message)
    }


});



module.exports = router; 