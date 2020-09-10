const router = require('express').Router();
/***
 * Se importan los routers
 * de cada modelo de los archivos de la 
 * carpeta /routers/api
 */
const apiProdRouter = require('./api/products'); 
const apiCategoriaRouter = require('./api/categories');
const apiUsuarioRouter = require('./api/users');
/***
 * Se indica que debe escuchar todas las rutas.
 * EJEMPlO despues de prefijo localhost/apiv0.1/productos/:25 esto para hacer
 * una actualizacion.
 */
router.use('/productos', apiProdRouter); 
router.use('/categorias', apiCategoriaRouter);
router.use('/usuarios', apiUsuarioRouter);

module.exports = router; //se exporta hacia el archivo main.js donde esta la ruta principal localhost/apiv0.1/