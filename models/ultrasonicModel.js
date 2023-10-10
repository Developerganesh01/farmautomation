const mongoose = require('mongoose');
// Define the User schema
const ultrasonicSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Create the  model based on the schema
const ultrasonicSensor = mongoose.model('ultrasonicSensor', ultrasonicSchema);
// Export the  model so it can be used elsewhere in your application
module.exports = ultrasonicSensor;
