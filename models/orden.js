/*****
 * Creacion de la tabla productos desde el ORM sequelize
 * Se retrona para ser inplementado en el archivo dbconfig.js
 * Se genera un archivo por cada tabla
 */

module.exports = (sequelize, type) => { // Esta es una funcion sin nombre que esta siento exportado y recibe 2 parametros

    return sequelize.define('orden', { // Los nombres de los campos deben ser en singular NO EN PLURAL
        ordenId: {                    // Campo de la tabla producto
            type: type.INTEGER,         // Tipo de datos
            primaryKey: true,
            autoIncrement: true
        },
        clienteId: type.INTEGER,
        mesaId: type.INTEGER,
        descuento: {
            type: type.DOUBLE(5, 2),
            defaultValue: 0
        },
        fecha: {
            type: type.DATEONLY,
            allowNull: false,
            defaultValue: type.NOW
        },
        hora: {
            type: type.TIME,
            allowNull: false,
            defaultValue: type.NOW
        },
        estado: {
            type: type.ENUM('0','1','2'),
            defaultValue: '1'
        },
        tipo_pago: {
            type: type.ENUM('e','t')
        },
        total: {
            type: type.DOUBLE(5, 2),
            defaultValue: 0
        },
        efectivo: {
            type: type.DOUBLE(5, 2),
            defaultValue: 0
        },
        cambio : {
            type: type.DOUBLE(5, 2),
            defaultValue: 0
        },
        tipo_orden: {
            type: type.ENUM('M','L'),
            defaultValue: 'M'
        },

    }, { timestamps: false });
};

// ESTE ARCHIVO SE PUEDE TOMAR DE EJEMPLO SOLO CAMBIAR EL NOMBRE DE LA TABLA Y LOS CAMPOS
