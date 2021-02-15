const router = require('express').Router();
/***
 * Se importan los routers
 * de cada modelo de los archivos de la
 * carpeta /routers/api
 */


router.use('/admin', require('./router/admin'));


//se exporta hacia el archivo main.js donde esta la ruta principal localhost/apiv0.1/
module.exports = router;
