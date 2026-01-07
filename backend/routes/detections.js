const express = require('express');
const router = express.Router();
const Detection = require('../models/Detection');

router.post('/save', async (req, res) => {
  try {
    const newDetection = new Detection(req.body);
    await newDetection.save();
    res.json({ message: 'Saved to DB' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const detections = await Detection.find().sort({ date: -1 });
    res.json(detections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
