const mongoose = require("mongoose");

// Define the Item schema
const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    locationFound: {
        type: String,
        required: true,
    },
    dateFound: {
        type: Date,
        default: Date.now,
    },
    claimed: {
        type: Boolean,
        default: false,
    },
});

// Create and export the Item model
module.exports = mongoose.model("Item", itemSchema);