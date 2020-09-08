const router = require('express').Router();

const apiProdRouter = require('./api/products'); // Se importa el router de api/productos

router.use('/productos', apiProdRouter) // se le indica que debe escuchar todas las rutas
//despues de prefijo /productos EJEMPlO localhost/apiv0.1/productos/:25

module.exports = router; //se exporta hacia el archivo main.js donde esta la ruta principal localhost/apiv0.1/