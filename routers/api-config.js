const middleware  =  require('./middlewares/middlewares');
const router = require('express').Router();
/***
 * Se importan los routers
 * de cada modelo de los archivos de la 
 * carpeta /routers/api
 */
const apiProdRouter = require('./api/products'); 
const apiCategoriaRouter = require('./api/categories');
const apiUsuarioRouter = require('./api/users');
const apiMesaRouter = require('./api/mesa');
const apiClienteRouter = require('./api/cliente');
const apiOrdenRouter = require('./api/orden');
const apiOrdenDetRouter = require('./api/ordendet');
const apiPromoRouter = require('./api/promo');
const apiReports = require('./api/reports');

/***
 * Se indica que debe escuchar todas las rutas.
 * EJEMPlO despues de prefijo localhost/apiv0.1/productos/:25 esto para hacer
 * una actualizacion.
 */
router.use('/products',middleware.validarToken ,apiProdRouter); 
router.use('/category',middleware.validarToken, apiCategoriaRouter);
router.use('/users', apiUsuarioRouter);
router.use('/mesas',middleware.validarToken ,apiMesaRouter); 
router.use('/cliente',middleware.validarToken ,apiClienteRouter); 
router.use('/orden',middleware.validarToken ,apiOrdenRouter); 
router.use('/ordendet',middleware.validarToken ,apiOrdenDetRouter); 
router.use('/promociones',middleware.validarToken ,apiPromoRouter); 

router.use('/reportes', apiReports);



//se exporta hacia el archivo main.js donde esta la ruta principal localhost/apiv0.1/
module.exports = router; 