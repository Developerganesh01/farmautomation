const mongoose = require('mongoose');
// Define the schema
const ldrSchema = new mongoose.Schema({
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
const ldrSensor = mongoose.model('ldrSensor',ldrSchema);
// Export the  model so it can be used elsewhere in your application
module.exports = ldrSensor;
