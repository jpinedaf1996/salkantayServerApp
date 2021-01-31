const router = require('express').Router();
const jwt = require('jwt-simple');
const moment = require('moment');
const { fraseAcceso } = require('../api/createToken');
const { OrdenDet, Orden,ticketVenta } = require('../../dbconfig');

router.get('/precuenta/:TOKEN?/:ID', function (req, res, next) {
    
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
        let ordendetbyproducto = await OrdenDet.findAll({
            where: {
                ordenId: req.params.ID
            },
            include:
            {
                model: Orden,
                attributes: ['descuento','mesaId','fecha','hora'],

            }
        });
        
    
        //const resu =  JSON.parse(ordenes)
        res.render('precuenta',{detalle : JSON.stringify(ordendetbyproducto)})
        // const html = `<h1>${req.params.ID}</h1>`;

        // res.send(html);
    
    } catch (error) {
    
        res.send(error.message)
    }


});

router.get('/ticket/:TOKEN?/:ID', function (req, res, next) {
    
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

        let ticket = await ticketVenta.findOne({
            where: {
                ordenId: req.params.ID
            },
            include:
            {
                model: Orden

            }
        });
        
        let detalle = await OrdenDet.findAll({
            where: {
                ordenId: req.params.ID
            }
        });
        
    
        ///const resu =  JSON.parse(ordenes)

        let json ={
            headers:JSON.parse(JSON.stringify(ticket)),
            detalle: JSON.parse(JSON.stringify(detalle))
        };

        // json.headers  = JSON.parse(JSON.stringify(ticket));
        // json.detalle  = JSON.parse(JSON.stringify(detalle));

        console.log(json.detalle);
        //console.log(JSON.parse(det));
       // res.send(res.json(ticket));;
        res.render('ticketventa',{detalle : JSON.stringify(json)});
        // const html = `<h1>${req.params.ID}</h1>`;

        // res.send(html);
    
    } catch (error) {
    
        res.send(error.message)
    }


});



module.exports = router; 