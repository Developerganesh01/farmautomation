// Used to measure the acidity or alkalinity of the water 
// with a value between 0 – 14.
const path=require('path');
const express=require('express');
const ph_sensor_router=express.Router();
// ph_sensor_router.get('/',(req,res)=>{
//     res.status(200).send('phsensor');
// })
ph_sensor_router.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'..','/public','ph.html'));
});
module.exports=ph_sensor_router;
