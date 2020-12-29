const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Routes
app.get('/', (req, res) => {
  res.json({ data: 'Hello World' });
});

// Express app port No
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
