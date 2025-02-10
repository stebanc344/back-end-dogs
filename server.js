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


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));