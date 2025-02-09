const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true }, // URL image
  description: { type: String },
});

const Dog = mongoose.model("Dog", DogSchema);

module.exports = Dog;