
// server.js
require('dotenv').config();                    // 1. Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Detection = require('./models/Detection');  // Your Mongoose model

const app = express();
const PORT = process.env.PORT || 3001;

// 2. Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// 3. Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 4. Routes

// Save a new detection record
app.post('/save-detection', async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // Log the incoming data to check if gender is sent
    const detection = new Detection(req.body);
    await detection.save();
    return res.status(201).json({ message: 'Detection saved successfully' });
  } catch (err) {
    console.error('Error saving detection:', err);
    return res.status(500).json({ error: 'Failed to save detection' });
  }
});


// Fetch all detection records
app.get('/detections', async (req, res) => {
  try {
    const detections = await Detection.find().sort({ createdAt: -1 });
    return res.json(detections);
  } catch (err) {
    console.error('Error fetching detections:', err);
    return res.status(500).json({ error: 'Failed to fetch detections' });
  }
});
// Delete detection by ID
app.delete('/detections/:id', async (req, res) => {
  try {
    await Detection.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Detection deleted successfully" });
  } catch (err) {
    console.error('Error deleting detection:', err);
    res.status(500).json({ error: 'Failed to delete detection' });
  }
});


// 5. Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
