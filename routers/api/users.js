//Se crean las rutas para una API REST con los diferente metodos
const router = require('express').Router();
const { Usuarios } = require('../../dbconfig');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const token = require('./createToken');
const middleware = require('../middlewares');

//Funcion para validar el incio de sesion

router.get('/validarToken', middleware.validarToken, async (req, res) => { 
    
    return res.status(303).json({ success: 'El token el token es valido' });
    
});

router.post('/login', [

    check('usuario', 'El nombre del usario es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),

], async (req, res) => {
    // Se validan los datos
    //Si existe un error devuelve el codigo 422
    const erros = validationResult(req);

    if (!erros.isEmpty()) {

        return res.status(422).json({ errores: erros.array() });

    }
    //Se busca el usuario en la base de datos y lo guarda en variable user
    const user = await Usuarios.findOne({
        where: {
            usuario: req.body.usuario
        }
    });

    if (user) {
        //Si el usuario existe compara las contraseñas encriptadas
        const iguals = bcrypt.compareSync(req.body.pass, user.pass);

        if (iguals) {

            res.json({
                //Si la cotraseña es correcta se crea un token de sesion
                success: token.createToken(user)
            });

        } else {
            res.json({ error: 'Error en usuario o contraseña!' });
        }
    } else {
        res.json({ error: 'Error en usuario o contraseña!' });
    }
});

router.post('/', [
    check('usuario', 'El nombre del usario es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),
], async (req, res) => {

    const erros = validationResult(req);

    if (!erros.isEmpty()) {

        return res.status(422).json({ errores: erros.array() });

    }
    //Funcion para encriptar la cotraseña 
    req.body.pass = bcrypt.hashSync(req.body.pass, 10);

    // HAce el insert a la DB
    let usuarios = await Usuarios.create(req.body);

    //Devuelve el ultimo insertado en la DB 
    res.json(usuarios);
});

router.get('/', async (req, res) => {
    let usuarios = await Usuarios.findAll();
    res.json(usuarios);
});

router.put('/:usuarioId', async (req, res) => { //estas rutas reciben parametros 
    await Usuarios.update(req.body, { // funcion para actualizar 
        where: { usuarioId: req.params.usuarioId }
    });
    res.json({ success: 'Se ha actualizado un registro.' });

});

router.delete('/:usuarioId', async (req, res) => { //estas rutas reciben parametros 
    await Usuarios.destroy({ // funcion para borrar 
        where: { usuarioId: req.params.usuarioId }
    });
    res.json({ success: 'Se ha borrado un registro.' });

});

module.exports = router; // se exporta el router hacia api.js