const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan"); 
const Dog = require('./models/Dog');
const dogRoutes = require("./routes/dogs");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

// check connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// universal middleware
app.use(express.json())
app.use(logger('dev'))
app.use(cors())


// Routes
app.use("/dogs", dogRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Dog API!');
  });

/*app.get('/dogs', async (req, res) => {
    try {
      const dogs = await Dog.find();
      res.json(dogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
app.post('/dogs', async (req, res) => {
    const { name, breed, image } = req.body;
    const newDog = new Dog({ name, breed, image });
  
    try {
      await newDog.save();
      res.status(201).json(newDog);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE route
  app.delete('/dogs/:id', async (req, res) => {
    try {
      await Dog.findByIdAndDelete(req.params.id);
      res.status(200).send('Dog deleted');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
*/
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));