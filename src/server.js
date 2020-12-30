const express = require('express');
const app = express();
const serverless = require('serverless-http'); // Serverless module allowing to run lambda functions
const path = require('path');
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const freshDesk = require('./freshDesk');

app.use(express.static(path.join(__dirname, '../dist'))); // Set static folder
app.set('views', __dirname + '/../dist/views'); // Set views path
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs'); // set the view engine to ejs

// Middleware
app.use(freshDesk);

// Routes
app.get('/', (req, res) => {
  // res.json({ data: 'Hello World' });
  res.render('index', {
    data: {
      id: 1,
      name: 'Frodo',
      password: 'password',
    },
  });
});

// Allowing lambda function to run - exporting handler function
module.exports = app;
module.exports.handler = serverless(app);

// Express app port No
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`Server Started on Port ${PORT}`);
});
