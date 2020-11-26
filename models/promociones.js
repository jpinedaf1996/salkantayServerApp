/*****
 * Creacion de la tabla usuarios desde el ORM sequelize 
 * Se retrona para ser inplementado en el archivo dbconfig.js 
 * Se genera un archivo por cada tabla 
 */

module.exports = (sequelize, type)=>{ // Esta es una funcion sin nombre que esta siento exportado y recibe 2 parametros
    return sequelize.define('promociones',{ // Los nombres de los campos deben ser en singular NO EN PLURAL
        promoId:{                    // Campo de la tabla producto 
            type: type.INTEGER,         // Tipo de datos 
            primaryKey: true,
            autoIncrement: true
        },
        desc: type.STRING,
        valor: type.STRING(150),
        estado: {
            type: type.ENUM('0', '1'),
            defaultValue: '1'
        }
    },{ timestamps: false });

};  

// ESTE ARCHIVO SE PUEDE TOMAR DE EJEMPLO SOLO CAMBIAR EL NOMBRE DE LA TABLA Y LOS CAMPOS
