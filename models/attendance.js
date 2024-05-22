const {DataTypes}=require('sequelize');
const sequelize=require('../utils/database');

const Attendance= sequelize.define('attendance',{
    day:{
        type:DataTypes.STRING
    }
    ,
    present:{
        type:DataTypes.BOOLEAN
    }

});

module.exports=Attendance;
