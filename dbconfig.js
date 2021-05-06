const { queryType, Sequelize } = require('sequelize'); // Se importa la libreria
const ProdModel = require('./models/productos'); // Se importa la funcion que esta creando la tabla
const CateModel = require('./models/categorias');
const UserModel = require('./models/usuarios');
const MesaModel = require('./models/mesa');
const ClienteModel = require('./models/cliente');
const OrdenModel = require('./models/orden');
const OrdenDetModel = require('./models/ordendet');
const PromocionesModel = require('./models/promociones');
const ticketventaModel = require('./models/ticketventa');
const InformacionModel = require('./models/informacion');

const bcrypt = require('bcryptjs');

/**
 * se genera la Conexion de la DB
 *
 */
const Conexion = new Sequelize('iwzp0x1xdhz32l1f', 'o41pgx1wssgmjsmw', 'vyeotjnopvs63q1j', {
  host: 'jhdjjtqo9w5bzq2t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialect: 'mariadb'
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
const Promociones = PromocionesModel(Conexion, Sequelize);
const ticketVenta = ticketventaModel(Conexion, Sequelize);
const Info = InformacionModel(Conexion, Sequelize);

// RELACIONES

Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', onDelete: 'restrict' });
Orden.belongsTo(Cliente, { as: 'cliente', foreignKey: 'clienteId', onDelete: 'restrict' });
Orden.belongsTo(Mesa, { foreignKey: 'mesaId', onDelete: 'cascade' });
OrdenDet.belongsTo(Orden, { foreignKey: 'ordenId', onDelete: 'cascade' });

Producto.belongsTo(Promociones, { foreignKey: 'promoId', onDelete: 'restrict' });

ticketVenta.belongsTo(Orden, { foreignKey: 'ordenId', onDelete: 'restrict' });


/**
 * Se sincroniza con la base de datos
 *
 * 
 * 
 */
Conexion.sync({ force: true })
  .then(() => {
    createInit()
    console.log('Databases has been updated!!')
  });
/**
 *se exportan los objetos para ser reutilizados
 *
 */
async function createInit() {

  try {

    await Promociones.create({
      promoId: '1',
      desc: 'Sin promo',
      valor: '0.00'
    });

    await Usuarios.create({
      usuarioId: '1',
      usuario: '@admin',
      pass: bcrypt.hashSync('catolica2021', 10),
      tipo: '1'
    });


  } catch (error) {

    console.log("La promocion y el usuario inicial ya han sido creados: " + error.message);

  }
  
}


module.exports = {
  Conexion,
  Producto,
  Mesa,
  Categoria,
  Usuarios,
  Cliente,
  Orden,
  OrdenDet,
  ticketVenta,
  Promociones,
  Info
};
