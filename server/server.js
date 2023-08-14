// server/server.js

require('dotenv').config({ path: '../.env' });
const express = require('express');
const connectDB = require('./config/database');
const usersRoutes = require('./routes/api/users')
const app = express();

app.use(express.json());

app.use('/api/users', usersRoutes);
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
