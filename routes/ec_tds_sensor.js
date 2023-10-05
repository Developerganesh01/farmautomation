const express=require('express');
const ec_tds_sensor_router=express.Router();
ec_tds_sensor_router.get('/',(req,res)=>{
    res.status(200).send('ec_tds_sensor');
});
module.exports=ec_tds_sensor_router;