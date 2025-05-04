const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Add a found item
router.post("/", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// View all unclaimed items
router.get("/unclaimed", async (req, res) => {
    try {
        const unclaimedItems = await Item.find({ claimed: false });
        res.json(unclaimedItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View one item by ID
router.get("/:id", getItem, (req, res) => {
    res.json(res.item);
});

// Update an item’s details or mark as claimed
router.patch("/:id", getItem, async (req, res) => {
    if (req.body.itemName != null) {
        res.item.itemName = req.body.itemName;
    }
    if (req.body.description != null) {
        res.item.description = req.body.description;
    }
    if (req.body.locationFound != null) {
        res.item.locationFound = req.body.locationFound;
    }
    if (req.body.claimed != null) {
        res.item.claimed = req.body.claimed;
    }

    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an item
router.delete("/:id", getItem, async (req, res) => {
    try {
        await res.item.remove();
        res.json({ message: "Deleted item" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to get an item by ID
async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: "Cannot find item" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.item = item;
    next();
}

module.exports = router;