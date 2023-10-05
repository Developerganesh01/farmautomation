const express=require('express');
const ultrasonic_sensor_router=express.Router();
ultrasonic_sensor_router.get('/',(req,res)=>{
    res.status(200).json({
        message:"success",
        data:"yltrasonic"
    })
});
module.exports=ultrasonic_sensor_router;