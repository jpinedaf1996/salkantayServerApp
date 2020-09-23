const Sequelize = require('sequelize'); // Se importa la libreria 
const ProdModel = require('./models/productos'); // Se importa la funcion que esta creando la tabla
const CateModel = require('./models/categorias');
const UserModel = require('./models/usuarios');
/**
 * se genera la Conexion de la DB
 * 
 */
const Conexion = new Sequelize('salkantaydb','root','catolica',{
    host:'localhost',
    dialect:'mariadb'
}); 
/**
 * Se usa la funcion importada 
 * se le pasa los 2 parametros la Conexion y la librria
 * 
 */
const Producto = ProdModel(Conexion, Sequelize); 
const Categoria = CateModel(Conexion, Sequelize);
const Usuarios = UserModel(Conexion, Sequelize);

// RELACIONES

Producto.belongsTo(Categoria,{as:'categorias',foreignKey:'categoriaId',onDelete:'cascade'})
/**
 * Se sincroniza con la base de datos 
 * 
 */
Conexion.sync({force:false})
.then(()=>{
    console.log('Databases has been updated!!')
}); 
/**
 *se exportan los objetos para ser reutilizados
 * 
 */
module.exports = { 
    Producto,
    Categoria,
    Usuarios
};