const express = require('express');
const app = express();
const port = 3000;

// Set up DB
const dbSetup = require('./dbSetup');
dbSetup();

app.get('/orders/retrieve/', (req, res) => {
  res.send('Retrieve Orders');
});

app.get('/orders/add/', (req, res) => {
  res.send('Add Orders');
});

app.listen(port, () => console.log(`Order app listening on port ${port}`)); // eslint-disable-line no-console
