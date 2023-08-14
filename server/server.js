// server/server.js

require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const connectDB = require('./config/database');
const usersRoutes = require('./routes/api/users');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ extended: false }));

app.use('/api/users', usersRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
