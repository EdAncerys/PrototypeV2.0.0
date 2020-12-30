const express = require('express');
const form = express();
const path = require('path');
const bodyParser = require('body-parser');

form.use(express.static(path.join(__dirname, '../dist'))); // Set static folder
form.set('views', __dirname + '/../dist/views'); // Set views path
form.engine('html', require('ejs').renderFile);
form.set('view engine', 'ejs'); // set the view engine to ejs
form.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
form.use(bodyParser.json()); // parse application/json

form.post('/submitForm', (req, res, next) => {
  const { name, email } = req.body;
  console.log(`Submitting From: ${name} ${email} `);
  console.log(res.statusCode);
  if (res.statusCode === 200)
    res.status(200).json({ name: name, email: email });
  next();
});

module.exports = form;
