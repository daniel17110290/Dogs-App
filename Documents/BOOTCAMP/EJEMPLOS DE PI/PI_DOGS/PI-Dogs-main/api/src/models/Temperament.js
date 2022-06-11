const {DataTypes}=require ("sequelize");

module.exports = (sequelize)=>{
    sequelize.define ("temperament",{
        // id:{
        //     type:DataTypes.UUIDV4,
        //     allowNull:false,
        //     primaryKey:true
        // },

        temperament: {
            type:DataTypes.STRING,
            allowNull:false,
            
        }
    })
}