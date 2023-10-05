const express=require('express');
const temperature_sensor_router=express.Router();
temperature_sensor_router.get('/',(req,res)=>{
    res.status(200).send("in temperature_sensor");

});
module.exports=temperature_sensor_router;