const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();
dotenv.config();
const DB_STRING=process.env.DB_STRING;
const DB_USER=process.env.DB_USER;
const DB_PASSWORD=process.env.DB_PASSWORD;
const PORT=process.env.PORT;
mongoose.connect(DB_STRING.replace("<user>",DB_USER).replace("<password>",DB_PASSWORD))
.then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(`connection to database failed ${err}`);
});
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
//==============================================================================================================
/* sensor componment structure ***==>placeholder
<a class="sensor-box" href=***sensor.href*****>
    <h2>****sensor.title****</h2>
    <p class="sensor-description">***sensor.decription***</p>
    <div class="sensor-value" id=***sensor.valueId**>Loading...</div>
    <button class="view-sensor-data-button" data-sensor=***sensor.dataAttribute***>****
    sensor.dataValue***</button>
</a>
*/
/* conatins two values=> temperature and humidity 
 <a class="sensor-box" href="temperature-humidity-sensor">
            <h2>Temperature and Humidity Sensor (DHT22)</h2>
            <p class="sensor-description">Used to measure the temperature and humidity values.</p>
            <div class="sensor-value" id="temperature-value">Loading...</div>
            <div class="sensor-value" id="humidity-value">Loading...</div>
            <button class="view-sensor-data-button" data-sensor="temperature-humidity-sensor">View Temperature and Humidity Sensor's Data</button>
        </a>
*/
//================================================================================================================
//============================sensors data related to three main pages============================
const environmentMonitoringSensors=[
 { href:'co2-sensor',title:'CO2 Gas Sensor',
 description:'Measures the concentration of CO2 gas in the air',
 valueId: 'co2-value', dataAttribute: 'co2-sensor',dataValue:"View Conc of CO2 Sensor's Data"
  },
  { href:'oxygen-sensor',title:'Oxygen Gas Sensor',
  description:'Measures the concentration of oxygen gas in the air',
  valueId: 'oxygen-value', dataAttribute: 'oxygen-sensor',dataValue:"View Conc of Oxygen Sensor's Data"
   },
   { href:'barometric-sensors',title:'BMP180 Barometric Sensor',
   description:'Measures atmospheric pressure',
   valueId: 'barometric-value', dataAttribute:'pressure-sensor',dataValue:"View Atmospheric Pressure Sensor's Data"
    }
];
const nutrientDosingSensors=[ { href:'ph-sensor',title:'PH Sensor',
description:'Used to measure the acidity or alkalinity...',
valueId: 'ph-value', dataAttribute: 'ph-sensor',dataValue:"View PH Sensor's Data"
 },
 { href:'tds-sensor',title:'TDS Sensor',
description:'Measures the total dissolved solids in water with a range of 0 to 1000 ppm.',
valueId: 'tds-value', dataAttribute: 'tds-sensor',dataValue:"View TDS Sensor's Data"
 },
 { href:'ultrasonic-sensor',title:'Ultrasonic Sensor',
description:'Measuring distance',
valueId: 'ultrasonic-value', dataAttribute: 'ultrasonic-sensor',dataValue:"View Ultrasonic Sensor's Data"
 },
 { href:'temperature-sensor',title:'Temperature Sensor',
description:"Measures water's temperature",
valueId: 'temperature-value', dataAttribute: 'temperature-sensor',dataValue:"View Temperature Sensor's Data"
 },
 { href:'water-flow-meter',title:'Water Flow Meter',
description:'Measures the quantity of water flown through it',
valueId: 'water-flow-value', dataAttribute: 'water-flow-sensor',dataValue:"View Water-flow Sensor's Data"
 },
 { href:'dissolve-oxygen-sensor',title:'Dissolve Oxygen Sensor',
 description:'Measures oxygen pressure in the tank',
 valueId: 'dissolve-oxygen-value', dataAttribute: 'dissolve-oxygen-sensor',dataValue:"View Dissolve oxygen Sensor's Data"
  },
];
const growLightsSensor=[{ href:'bh1750-sensor',title:'BH1750 (GY-30) Sensor',
description:"Measures ambient light intensity",
valueId: 'bh1750-value', dataAttribute: 'bh1750-sensor',dataValue:"View BH1750 Sensor's Data"
 },
 { href:'ldr-sensor',title:'LDR Sensor',
 description:"Measures the resistance of the light-dependent resistor",
 valueId: 'ldr-value', dataAttribute: 'ldr-sensor',dataValue:"View LDR Sensor's Data"
}];
//============================three main page routes===============================================
const ejs=require('ejs');
app.get('/environment-monitoring', async (req, res) => {
    const componentPromises = environmentMonitoringSensors.map(sensor => {
        return ejs.renderFile('./views/sensor.ejs', { sensor });
    });
    const componentStrings = await Promise.all(componentPromises);
    const content = componentStrings.join('');
    res.render('layout', {
        title: "Indoor Environment Monitoring System",
        content
    });
});
 app.get('/nutrient-dosing',async(req,res)=>{
    const componentpromises=nutrientDosingSensors.map((sensor)=>{
        return ejs.renderFile('./views/sensor.ejs',{sensor});
    });
    const components=await Promise.all(componentpromises);
    const content=components.join('');
    res.render('layout',{
        title:"Automatic Nutrient Dosing System",
        content
    });
});
 app.get('/grow-lights',async(req,res)=>{
    const componentPromises=growLightsSensor.map((sensor)=>{
        return ejs.renderFile('./views/sensor.ejs',{sensor});
    })
    const components=await Promise.all(componentPromises);
    const content=components.join('');
    res.render('layout',{
        title:"Grow Lights Automation System",
        content
    })
});
/*<a class="sensor-box" href="<%= sensor.href %>">
    <h2><%= sensor.title %></h2>
    <p class="sensor-description"><%= sensor.description %></p>
    <div class="sensor-value" id="<%= sensor.valueId %>">Loading...</div>
    <button class="view-sensor-data-button" data-sensor="<%= sensor.dataAttribute %>">View <%= sensor.dataValue %> Data</button>
</a>
*/ 
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
        default:
            res.status(404).send('Not Found: Invalid Key');
    }
})
//=====================================server connection=======================================
app.listen(PORT,()=>{
    console.log("server started");
});
 
