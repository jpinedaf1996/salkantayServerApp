const Sequelize = require('sequelize'); // Se importa la libreria 
const ProdModel = require('./models/productos'); // Se importa la funcion que esta creando la tabla

const conexion = new Sequelize('salkantaydb','root','catolica',{
    host:'localhost',
    dialect:'mariadb'
}); // se genera la conexion de la DB 

const Producto = ProdModel(conexion, Sequelize); // Se usa la funcion importada 
//se le pasa los 2 parametros la conexion y la librria 

conexion.sync({force:false})
.then(()=>{
    console.log('Databases has been updated!!')
}); 
// se ejecuta el proceso 

module.exports = { // se exportan los objetos para ser reutilizados
    Producto
};