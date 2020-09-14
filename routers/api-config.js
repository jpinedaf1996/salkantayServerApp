/***
 * Se importan los routers
 * de cada modelo de los archivos de la 
 * carpeta /routers/api
 */
const middleware  =  require('./middlewares');
const router = require('express').Router();
const apiProdRouter = require('./api/products'); 
const apiCategoriaRouter = require('./api/categories');
const apiUsuarioRouter = require('./api/users');

/***
 * Se indica que debe escuchar todas las rutas.
 * EJEMPlO despues de prefijo localhost/apiv0.1/productos/:25 esto para hacer
 * una actualizacion.
 */
router.use('/products',middleware. validarToken ,apiProdRouter); 
router.use('/category',middleware. validarToken, apiCategoriaRouter);
router.use('/users', apiUsuarioRouter);

//se exporta hacia el archivo main.js donde esta la ruta principal localhost/apiv0.1/
module.exports = router; 