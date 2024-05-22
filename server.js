const PORT=4000;
const express=require('express');
const app=express();
const path=require('path')
const homeRouter= require('./routes/home');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./utils/database');

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/',homeRouter);

// Models

const Attendance=require('./models/attendance');
const User = require('./models/user');

User.hasMany(Attendance);
Attendance.belongsTo(User);


sequelize.sync()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Listening On Port "+PORT);
    });
})
