/*****
 * Creacion de la tabla productos desde el ORM sequelize
 * Se retrona para ser inplementado en el archivo dbconfig.js
 * Se genera un archivo por cada tabla
 */

module.exports = (sequelize, type)=>{ // Esta es una funcion sin nombre que esta siento exportado y recibe 2 parametros

    return sequelize.define('info',{ // Los nombres de los campos deben ser en singular NO EN PLURAL
        infoId:{                    // Campo de la tabla info
            type: type.INTEGER,         // Tipo de datos
            primaryKey: true,
            autoIncrement: true
        },
        empresa: type.STRING(60),
        direccion: type.STRING(60),
        telefono: type.STRING(60),
        nit: type.STRING(60),
        nrc: type.STRING(60),
        giro: type.STRING(60),
        sucursal: type.STRING(60)


    },{ timestamps: false });
};

// ESTE ARCHIVO SE PUEDE TOMAR DE EJEMPLO SOLO CAMBIAR EL NOMBRE DE LA TABLA Y LOS CAMPOS
