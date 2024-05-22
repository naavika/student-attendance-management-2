const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home')

router.get('/',homeController.homeGet);

router.get('/setup',homeController.setup);

router.get('/getstudent',homeController.getStudent);

router.get('/getreport',homeController.getReport);

router.get('/getdate/:date',homeController.getDate);

router.post('/postattendance',homeController.postAttendance);

module.exports=router;