// Used to measure the acidity or alkalinity of the water 
// with a value between 0 – 14.
const CollectionModel=require('../models/ldrsensorModel');
const path=require('path');
const express=require('express');
const ldr_sensor_router=express.Router();
// ph_sensor_router.get('/',(req,res)=>{
//     res.status(200).send('phsensor');
// })
ldr_sensor_router.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'..','/public','ldr.html'));
});
//data retrive
// Define a route to fetch data
ldr_sensor_router.get('/data', async (req, res) => {
    try {
      const dataPoints = await CollectionModel.find()
        .sort({ timestamp: -1 })
        .limit(60);
  
      const valuesArray = dataPoints.map(dataPoint => dataPoint.value);
      
      res.json(valuesArray);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports=ldr_sensor_router;
