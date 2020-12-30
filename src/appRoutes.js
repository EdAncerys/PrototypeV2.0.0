const express = require('express');
const appRoutes = express();
const path = require('path');
const bodyParser = require('body-parser');

appRoutes.use(express.static(path.join(__dirname, '../dist'))); // Set static folder
appRoutes.set('views', __dirname + '/../dist/views'); // Set views path
appRoutes.engine('html', require('ejs').renderFile);
appRoutes.set('view engine', 'ejs'); // set the view engine to ejs
appRoutes.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
appRoutes.use(bodyParser.json()); // parse application/json

appRoutes.get('/', (req, res, next) => {
  res.render('index', {
    data: {
      id: 1,
      name: 'Frodo',
      password: 'password',
    },
  });
  next();
});

appRoutes.post('/submitForm', (req, res) => {
  const { name, email } = req.body;
  console.log('Submitting From');
  res.json({ name: name, email: email });
});

module.exports = appRoutes;
