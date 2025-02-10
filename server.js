const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

const dogRoutes = require("./routes/dogs");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Check connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Universal middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use("/dogs", dogRoutes);  // Routes for /dogs are handled here

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Dog API!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));