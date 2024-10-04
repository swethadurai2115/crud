const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// CRUD operations for Items
router.post('/', async (req, res) => {
  const { name, price } = req.body;
  const newItem = new Item({ name, price });
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Item and Delete Item routes...

module.exports = router;
