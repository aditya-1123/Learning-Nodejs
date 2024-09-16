const express = require('express');
const router = express.Router();
const menuItem = require('./../models/menu');

// POST method to add a Menu Item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newItem = new menuItem(data);
        const response = await newItem.save();
        console.log('item saved');
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Invalid Server Error'})
    }
})

// GET method to get the Menu Items
router.get('/', async (req, res) => {
    try {
        const data = await menuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err) {  
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

router.get('/:tastetype', async (req, res) => {
    try {
        const tastetype = req.params.tastetype;
        if(tastetype == 'sweet' || tastetype == 'spicy' || tastetype == 'sour') {
            const response = await menuItem.find({taste : tastetype});
            console.log('response fteched');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({error: 'Invalid taste type'});
        }
    }
    catch(err) {  
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

module.exports = router;