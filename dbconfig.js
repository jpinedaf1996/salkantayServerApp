const Sequelize = require('sequelize'); // Se importa la libreria 
const ProdModel = require('./models/productos'); // Se importa la funcion que esta creando la tabla
const CateModel = require('./models/categorias');
const UserModel = require('./models/usuarios');
const MesaModel = require('./models/mesa');
const ClienteModel = require('./models/cliente');
const OrdenModel = require('./models/orden');
const OrdenDetModel = require('./models/ordendet');
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
 * se le pasa los 2 parametros la Conexion y la libreria
 * 
 */

const Producto = ProdModel(Conexion, Sequelize); 
const Categoria = CateModel(Conexion, Sequelize);
const Usuarios = UserModel(Conexion, Sequelize);
const Mesa = MesaModel(Conexion, Sequelize);
const Cliente = ClienteModel(Conexion, Sequelize);
const Orden = OrdenModel(Conexion, Sequelize);
const OrdenDet = OrdenDetModel(Conexion, Sequelize);

// RELACIONES

Producto.belongsTo(Categoria,{as:'categorias',foreignKey:'categoriaId',onDelete:'cascade'})
Orden.belongsTo(Cliente,{as:'cliente',foreignKey:'clienteId',onDelete:'cascade'})
Orden.belongsTo(Mesa,{as:'mesa',foreignKey:'mesaId',onDelete:'cascade'})
OrdenDet.belongsTo(Orden,{as:'orden',foreignKey:'ordenId',onDelete:'cascade'})
OrdenDet.belongsTo(Producto,{as:'producto',foreignKey:'productoId',onDelete:'cascade'})
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
    Mesa,
    Categoria,
    Usuarios,
    Cliente,
    Orden,
    OrdenDet
};