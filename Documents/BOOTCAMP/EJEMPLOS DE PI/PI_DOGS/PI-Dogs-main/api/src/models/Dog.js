const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },

    height: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        is: /[1-9]?[0-9]?[0-9] - [1-9]?[0-9]?[0-9]/g,
        notNull:{
          msg: "please insert info"
        }
        
      }
    },

    weight: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        is: /[1-9]?[0-9]?[0-9] - [1-9]?[0-9]?[0-9]/g
        
      }
    },

    life_span: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        is: /[1-9]?[0-9]?[0-9] - [1-9]?[0-9]?[0-9]/g
        
      }
    },

    image: {
      type:DataTypes.TEXT,
      allowNull:false
    },

    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  });
};
