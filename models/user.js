const {DataTypes}=require('sequelize');
const sequelize=require('../utils/database');

const User= sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING
    }

});

module.exports=User;
