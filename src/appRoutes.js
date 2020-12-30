const express = require('express');
const appRoutes = express();
const path = require('path');

appRoutes.use(express.static(path.join(__dirname, '../dist'))); // Set static folder
appRoutes.set('views', __dirname + '/../dist/views'); // Set views path
appRoutes.engine('html', require('ejs').renderFile);
appRoutes.set('view engine', 'ejs'); // set the view engine to ejs

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

module.exports = appRoutes;
