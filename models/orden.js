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
        fecha_hora: {
            type: type.DATE,
            allowNull: false,
            defaultValue: type.NOW
        },
        estado: {
            type: type.ENUM('0', '1'),
            defaultValue: '1'
        }


    }, { timestamps: false });
};

// ESTE ARCHIVO SE PUEDE TOMAR DE EJEMPLO SOLO CAMBIAR EL NOMBRE DE LA TABLA Y LOS CAMPOS
