const Dog = require("../models/Dog");
const express = require("express");
const router = express.Router();


// Create a new dog
router.post("/", async (req, res) => {
  try {
    const newDog = new Dog(req.body);
    await newDog.save();
    res.status(201).json(newDog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all dogs
router.get("/", async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Get a single dog
router.get("/:id", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    res.json(dog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Update a dog
router.put("/:id", async (req, res) => {
  try {
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDog) return res.status(404).json({ message: "Dog not found" });
    res.json(updatedDog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a dog
router.delete("/:id", async (req, res) => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) return res.status(404).json({ message: "Dog not found" });
    res.json({ message: "Dog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;