/*****
 * Creacion de la tabla productos desde el ORM sequelize 
 * Se retrona para ser inplementado en el archivo dbconfig.js 
 * Se genera un archivo por cada tabla 
 */

module.exports = (sequelize, type)=>{ // Esta es una funcion sin nombre que esta siento exportado y recibe 2 parametros

    return sequelize.define('ticketventa',{ // Los nombres de los campos deben ser en singular NO EN PLURAL
        tikectId:{                    // Campo de la tabla producto 
            type: type.INTEGER,         // Tipo de datos 
            primaryKey: true,
            autoIncrement: true
        } 
        ,
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
    },{ timestamps: false });   
};

// ESTE ARCHIVO SE PUEDE TOMAR DE EJEMPLO SOLO CAMBIAR EL NOMBRE DE LA TABLA Y LOS CAMPOS 