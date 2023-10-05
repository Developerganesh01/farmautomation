const express=require('express');
const path=require('path');
const app=express();
const ph_sensor_router=require('./routes/ph_sensor');
const ultrasonic_sensor_router=require('./routes/ultrasonic_sensor');
const ec_tds_sensor_router=require('./routes/ec_tds_sensor');
const temperature_sensor_router=require('./routes/temperature_Sensor');
// Serve static files from a directory (e.g., 'public')
app.use(express.static('public'));
// Set the correct MIME type for CSS files
app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.type('text/css');
  }
  next();
});
app.listen(3000,()=>{
    console.log("server created");
})
app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'/public','index.html'));
});
app.use('/ph',ph_sensor_router);
app.use('/ultrasonic',ultrasonic_sensor_router);
app.use('/ectds',ec_tds_sensor_router);
app.use('/temperature',temperature_sensor_router);