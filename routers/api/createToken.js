/*
* Funcion para crear el token con la libreia JWT-SIMPLE
*/
const jwt = require('jwt-simple');
const moment = require('moment');

const fraseAcceso  = 'coffeandcode'; 
const createToken= (user) => {
    const payload = {
        usuarioId: user.usuarioId,
        craateAt: moment().unix(),
        expireAt: moment().add(60, 'minutes').unix(),
    }
    return jwt.encode(payload,fraseAcceso );
}
module.exports = {
    fraseAcceso: fraseAcceso,
    createToken : createToken
}
