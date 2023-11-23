const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();
mongoose.connect("mongodb+srv://ganesh:012345@cluster0.a7uir7c.mongodb.net/testing?retryWrites=true&w=majority");
app.use(express.static("public"));
app.use((req, res, next) => {
  if (req.url.endsWith(".css")) {
    res.type("text/css");
  }
  next();
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'public','index.html'));
})
//============================three main page routes===============================================
 app.get('/environment-monitoring',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','environment-monitoring.html'));
});
 app.get('/nutrient-dosing',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','nutrient-dosing.html'));
});
 app.get('/grow-lights',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','grow-lights.html'));
});
//==================================importing models===============================================
const Phmodel=require('./models/phmodel');
const Barometermodel=require('./models/barometricmodel');
const Tdsmodel=require('./models/tdsmodel');
const Temperaturemodel=require('./models/temperaturemodel');
const Oxygenmodel=require('./models/oxygenmodel');
const Co2model=require('./models/co2model');
const Ultrasonicmodel = require('./models/ultrasonicmodel');
const Ldrmodel=require('./models/ldrmodel');
//=============================generating random data===============================================
/*
setInterval(async()=>{
    const doc1=new Phmodel({
        value:(Math.random()+1)*7
    });
   await doc1.save();
    const doc2=new Barometermodel({
        value:(Math.random()+1)*7
    });
    await doc2.save();
    const doc3=new Tdsmodel({
        value:(Math.random()+1)*7
    });
   await doc3.save();
    const doc4=new Temperaturemodel({
        value:(Math.random()+1)*7
    });
   await doc4.save();
      const doc5=new Oxygenmodel({
        value:(Math.random()+1)*7
    });
    await doc5.save();
    const doc6=new Co2model({
        value:(Math.random()+1)*7
    });
    await doc6.save();
    const doc7=new Ultrasonicmodel({
        value:(Math.random()+1)*7
    });
    await doc7.save();
    const doc8=new Ldrmodel({
        value:(Math.random()+1)*7
    });
    await doc8.save();
   
},2000000);
*/
//==================================controllers====================================================
const handleSensorPage = async(req, res) => {
    try {
      const sensor = req.params.sensor;
      res.render('sensor-data', { sensor });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
const handleSensorData = async(req,res,model) => {
    try {
      const sensor = req.params.sensor;
      const data = await model.find().sort({ current_time: -1 }).limit(20);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
//=================================routes for sensor(handling get requests for sensors)================
app.get('/:sensor',(req,res)=>{
    handleSensorPage(req,res);
})
app.get('/ph-sensor', async(req, res) => {
    try{
        const sensor="ph-sensor";
    res.render('sensor-data', { sensor  });
    }catch{
        console.log("err");
    }
});
app.get('/data/:sensor',async(req,res)=>{
    const sensor=req.params.sensor;
    switch(sensor)
    {
        case 'ph-sensor':
            await handleSensorData(req,res,Phmodel);
            break;
        case 'tds-sensor':
            await handleSensorData(req,res,Tdsmodel);
            break;
        case 'ultrasonic-sensor':
            await handleSensorData(req,res,Ultrasonicmodel);
            break;
        case 'temperature-sensor':
            await handleSensorData(req,res,Temperaturemodel);
            break; 
        case 'barometric-sensor':
            await handleSensorData(req,res,Barometermodel);
            break; 
        case 'oxygen-sensor':
            await handleSensorData(req,res,Oxygenmodel);
            break; 
        case 'co2-sensor':
            await handleSensorData(req,res,Co2model);
            break; 
        case 'ldr-sensor':
            await handleSensorData(req,res,Ldrmodel);
            break;   
    }
})
//=====================================server connection=======================================
app.listen('5000',()=>{
    console.log("server started");
});
 
