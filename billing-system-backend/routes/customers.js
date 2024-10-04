const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// CRUD operations for Customers
router.post('/', async (req, res) => {
  const { name, contact } = req.body;
  const newCustomer = new Customer({ name, contact });
  try {
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Customer and Delete Customer routes...

module.exports = router;
