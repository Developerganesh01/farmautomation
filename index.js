const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
//db connection
require("dotenv").config();
const connectDb = async () => {
  try {
    console.log("Db is connected!!");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Corrected write concern configuration
  writeConcern: {
    w: 'majority', // Use 'majority' instead of 'majority;'
    wtimeout: 0,
  },
    });
  } catch (error) {
    console.log(`Error :${error}`);
    process.exit();
  }
};
connectDb();
//routes
const ph_sensor_router = require("./routes/ph_sensor");
const ultrasonic_sensor_router = require("./routes/ultrasonic_sensor");
const ec_tds_sensor_router = require("./routes/ec_tds_sensor");
const temperature_sensor_router = require("./routes/temperature_Sensor");

// Serve static files from a directory (e.g., 'public')
app.use(express.static("public"));
// Set the correct MIME type for CSS files
app.use((req, res, next) => {
  if (req.url.endsWith(".css")) {
    res.type("text/css");
  }
  next();
});
app.listen(3000, () => {
  console.log("server created");
});
//homepage
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/public", "index.html"));
});
//model importing
const phSensor = require("./models/phModel");
const tdsSensor = require("./models/tdsModel");
const temperatureSensor = require("./models/temperatureModel");
const ultrasonicSensor = require("./models/ultrasonicModel");
//random data
app.get("/randomdata", async (req, res) => {
  try{
  // Generate random data (e.g., a random number)
  const randomValue = Math.floor(Math.random() * 3 + 5);
  const ppm = Math.floor(Math.random() * 1000 + 1);
  const temp = Math.floor(Math.random() * 60);
   // Create and save documents in the respective collections
   await phSensor.create({ value: randomValue });
   await tdsSensor.create({ value: ppm });
   await temperatureSensor.create({ value: temp });
  //  await ultrasonicSensor.create({ value: randomValue });
   // Send the data as JSON
  res.json({ randomValue, ppm, temp });}
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//middleware for route mounting
app.use("/ph", ph_sensor_router);
app.use("/ultrasonic", ultrasonic_sensor_router);
app.use("/ectds", ec_tds_sensor_router);
app.use("/temperature", temperature_sensor_router);
