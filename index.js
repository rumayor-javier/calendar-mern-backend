const express = require('express');
require('dotenv').config();

// Create express app
const app = express();

// Database
require('./database/config').dbConnection();

// Public folder
app.use(express.static('public'));

// Read and parse body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
