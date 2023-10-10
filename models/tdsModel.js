const mongoose = require('mongoose');
// Define the  schema
const tdsSchema = new mongoose.Schema({
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
const tdsSensor = mongoose.model('tdsSensor', tdsSchema);
// Export the  model so it can be used elsewhere in your application
module.exports =tdsSensor;
