// // Backend/models/Detection.js
// const mongoose = require("mongoose");

// const detectionSchema = new mongoose.Schema({
//   patientName: String,
//   patientAge: Number,
//   patientId: String,
//   image: String, // base64
//   detections: [
//     {
//       name: String,
//       confidence: Number
//     }
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Detection", detectionSchema);


// Backend/models/Detection.js
const mongoose = require("mongoose");

const detectionSchema = new mongoose.Schema({
  patientName: String,
  patientAge: Number,
  patientId: String,
  patientGender: String,
  image: String, // base64
  detections: [
    {
      name: String,
      confidence: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Detection", detectionSchema);
