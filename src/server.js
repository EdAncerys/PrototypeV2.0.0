const express = require('express');
const app = express();
const serverless = require('serverless-http'); // Serverless module allowing to run lambda functions
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const freshDesk = require('./freshDesk');

// Middleware
app.use(freshDesk);

// Routes
app.get('/', (req, res) => {
  res.json({ data: 'Hello World' });
});

// Allowing lambda function to run - exporting handler function
module.exports = app;
module.exports.handler = serverless(app);

// Express app port No
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
