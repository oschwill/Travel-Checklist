const { Router } = require('express');

const logEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await logEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newLogEntry = new logEntry(req.body);
    const createdEntry = await newLogEntry.save();
    res.json({
      response: createdEntry,
    });
  } catch (error) {
    switch (error.name) {
      case 'ValidationError':
        res.status(422);
        break;
      default:
        res.status(500);
        break;
    }
    next(error);
  }
});

module.exports = router;
