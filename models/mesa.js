/*****
 * Creacion de la tabla productos desde el ORM sequelize
 * Se retrona para ser inplementado en el archivo dbconfig.js
 * Se genera un archivo por cada tabla
 */

module.exports = (sequelize, type) => { // Esta es una funcion sin nombre que esta siento exportado y recibe 2 parametros

    return sequelize.define('mesa', { // Los nombres de los campos deben ser en singular NO EN PLURAL
        mesaId: {                    // Campo de la tabla producto
            type: type.INTEGER,         // Tipo de datos
            primaryKey: true,
            autoIncrement: true
        },
        num_mesa: type.STRING,
        descripcion: type.STRING(60),
        estado: {
            type: type.ENUM('0', '1'),
            defaultValue: '0' // estado de la mesa no ocupada
        }

    }, { timestamps: false });
};

// ESTE ARCHIVO SE PUEDE TOMAR DE EJEMPLO SOLO CAMBIAR EL NOMBRE DE LA TABLA Y LOS CAMPOS
