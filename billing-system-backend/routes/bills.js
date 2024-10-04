const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bill = require('../models/Bill');

// Create Bill
router.post('/', async (req, res) => {
    try {
        const { customer, items, totalAmount } = req.body;

        // Convert customer to ObjectId using 'new'
        const customerId = new mongoose.Types.ObjectId(customer);

        // Map through items and convert item ids to ObjectId using 'new'
        const formattedItems = items.map(item => ({
            item: new mongoose.Types.ObjectId(item.item),
            quantity: item.quantity
        }));

        // Create and save the new bill
        const newBill = new Bill({
            customer: customerId,
            items: formattedItems,
            totalAmount: totalAmount
        });

        await newBill.save();
        res.status(201).json(newBill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
