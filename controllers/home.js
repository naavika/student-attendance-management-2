const Attendance=require('../models/attendance');
const User=require('../models/user');
const {Op}=require('sequelize');
const Sequelize=require('sequelize');
const path=require('path');

exports.homeGet = async(req,res,next)=>{

    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  

}

exports.setup=async(req,res,next)=>{
  try {
    await User.destroy({where:{}});
    await Attendance.destroy({where:{}})
    await User.bulkCreate([
      {id:1,name:"Nidhi"},
      {id:2,name:"Neha"},
      {id:3,name:"Nikita"},
      {id:4,name:"Ruchi"},
      {id:5,name:"Sukriti"}
    ])

  const users= await User.findAll();
  res.json(users)
    
  } catch (error) {
    console.log(error);
  }
}

exports.getDate = async (req,res,next)=>{
  
    try {
        const users = await User.findAll({
          include: {
            model: Attendance,
            where: {
              day: req.params.date
            }
          },
          order:['id']
          
        });
        
        res.status(200).json(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    
}

exports.getStudent=async (req,res,next)=>{
   try {
     const result= await User.findAll();
     res.status(200).json(result);
   } catch (error) {
    console.log(error);
    
   }
}

exports.postAttendance=async (req,res,next)=>{

    console.log(req.body.data);
    const {data,date}=req.body;

    try {
        data.forEach(async(element) => {
            const arr=element.split('_');
            await Attendance.create({
                day:date,
                present:arr[1],
                userId:arr[0]
            })
            
        });

        res.status(201).json('Success')
        
        
    } catch (error) {
        console.log(error);
        
    }

}

exports.getReport=async (req,res,next)=>{
    try {
        const distinctDays = await Attendance.findAll({
          attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('day')), 'day']
          ]
        });

        const totalDays=parseInt(distinctDays.length==null?0:distinctDays.length);

        console.log(totalDays);

        const arr= await User.findAll({
          attributes: [
            'id',
            'name',
            [Sequelize.fn('SUM', Sequelize.col('attendances.present')), 'totalPresent']
          ],
          include: [{
            model: Attendance,
            attributes: []
          }],
          group: ['users.id'],
          order:['id']
        })
        arr.forEach(element => {
          const present=parseInt(element.dataValues.totalPresent==null?0:element.dataValues.totalPresent);
            element.dataValues.days=`${present}/${totalDays}`;
            
            element.dataValues.percent=parseInt(present*100/totalDays);
  
        });
        
        res.status(200).json(arr);
      } catch (error) {
        console.error('Error fetching distinct days:', error);
      }
}
