const jwt = require('jwt-simple');
const moment = require('moment');
const { fraseAcceso } = require('./api/createToken');
/**
 * Funcion para validar el token de inicio de sesion 
 */
const validarToken = (req,res,next)=>{
    /**
     * El token se envia por medio de la cabezeras
     * en una petecion HTTP
     */
    if(!req.headers['token']){
        //Si no viene el token Error
        return res.json({error: 'Token requerido'});
    }
    const token = req.headers['token']; // Se almacena el token en una variable 
    let payload = {
        //Objeto basio 
    };
    /**
     * Se valida en token con al funcion JWT.decode
     */
    try {
        payload = jwt.decode(token,fraseAcceso);
    }catch (error) {
        return res.json({error: 'El token es incorrecto'});
    }
    if (payload.expireAt < moment().unix()) {
        return res.json({error : 'El token expiro'});
    }
    
    req.usuarioId =  payload.usuarioId;

    next();
}

module.exports = {
    validarToken : validarToken
}