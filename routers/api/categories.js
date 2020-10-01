const router = require('express').Router();
const { Categoria } = require('../../dbconfig')
const { check, validationResult } = require('express-validator');
//Se crean las rutas para una API REST con los diferente metodos 

router.get('/', async (req, res) => {
    let categorias = await Categoria.findAll({});
    res.json(categorias);
});

router.post('/', [
    check('categoria', 'El nombre de la categoria es requerido').not().isEmpty()
], async (req, res) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {

        return res.status(422).json({ errores: erros.array() });

    }
    console.log(req.body)
    let categorias = await Categoria.create(req.body);
    res.json(req.body);
});

router.put('/:categoriaId', async (req, res) => { //estas rutas reciben parametros 
    await Categoria.update(req.body, { // funcion para actualizar 
        where: { categoriaId: req.params.categoriaId }
    });
    res.json({ success: 'Se ha actualizado un registro.' });

});

router.delete('/', async (req, res) => {
    const listToDelete = req.body.data.split(","); //estas rutas reciben parametros 
    var errores = 0;
    for (let i = 0; i < listToDelete.length; i++) {

        try {
            await Categoria.destroy({ // funcion para borrar 
                where: { categoriaId: listToDelete[i] }
            });
        } catch (error) {
            errores = errores + 1;
            error.message.indexOf("Cannot delete or update a parent row")
        }
    }
    if (errores > 0) {
        return res.status(422).json(
            {   
                cant: errores,
                errores: 'Verifique que las categorias no tengan productos'
            }
        );
    }

    return res.status(200).json({ success: 'Se han borrado con exito!' });

});

module.exports = router; // se exporta el router hacia api.js