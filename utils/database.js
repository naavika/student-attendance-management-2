const Sequelize=require('sequelize');
const sequelize= new Sequelize('student-attendance-management','root','RRRR@NNNN',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;