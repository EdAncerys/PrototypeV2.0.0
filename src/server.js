const express = require('express');
const app = express();
const serverless = require('serverless-http'); // Serverless module allowing to run lambda functions
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const freshDesk = require('./freshDesk');

app.use(express.static(path.join(__dirname, '../dist'))); // Set static folder
app.set('views', __dirname + '/../dist/views'); // Set views path
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs'); // set the view engine to ejs
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

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
app.post('/submitForm', (req, res) => {
  const { name, email } = req.body;
  console.log('Submitting From');
  res.json({ name: name, email: email });
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
