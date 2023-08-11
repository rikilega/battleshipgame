require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/api/users'); // Adjust the path if needed based on your project structure.

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // This will allow us to get the data from a POST

// Use Routes
app.use('/api/users', userRoutes);

// Sample route
app.get('/', (req, res) => {
    res.send("Battleship API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

