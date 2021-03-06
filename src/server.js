const express = require('express');
const app = express();
const serverless = require('serverless-http'); // Serverless module allowing to run lambda functions
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const router = express.Router();

// Import end points
// const freshDesk = require('./freshDesk');
const appRoutes = require('./appRoutes');
const form = require('./form');

app.use(express.static(path.join(__dirname, '../dist'))); // Set static folder
app.set('views', __dirname + '/../dist/views'); // Set views path
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs'); // set the view engine to ejs
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(`/.netlify/functions/server`, router);

router.get('/helloWorld', (req, res) => {
  res.json({
    data: 'Hello World!',
  });
});

// Middleware
router.use('/', appRoutes);
router.use('/', form);
app.use('/', router);

// Allowing lambada function to run - exporting handler function
module.exports = app;
module.exports.handler = serverless(app);

// Express app port No
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`Server Started on Port ${PORT}`);
});
