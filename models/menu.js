const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: { unique: true, collation: { locale: 'en', strength: 2 } }
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        required: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

// Create menuItem model
const menuItem = mongoose.model('menuItem', menuItemSchema);
module.exports = menuItem;
