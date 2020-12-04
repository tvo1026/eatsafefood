const express = require('express');
const router = express.Router();
const User = require('../models/User');


// Get all the users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err});
    }
});

// Get a specific user
router.get('/:zipcode', async (req, res) => {
    try {
        const user = await User.find ({"zipcode": req.params.zipcode});
        res.json(user);
    } catch (err) {
        res.json({ message: err});
    }
})

// Submit a user
router.post('/', async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        restaurantName: req.body.restaurantName,
        address: req.body.address,
        city: req.body.city,
        zipcode: req.body.zipcode
    });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Update a user
router.put('/:userName', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { userName: req.params.userName},
            { $set: {
                restaurantName: req.body.restaurantName,
                address: req.body.address,
                city: req.body.city,
                zipcode: req.body.zipcode,
                date: req.body.date
            }}
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({message: err});
    }
});

// Delete a user
router.delete('/:userName', async (req, res) => {
    try {
        const removedUser = await User.remove({userName: req.params.userName})
        res.json(removedUser)
    } catch (err) {
        res.json({ message: err});
    }
})

module.exports = router;