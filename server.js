const express = require('express');
const app = express();
const port = 3000;

// Set up DB
const dbSetup = require('./dbSetup');
dbSetup();

// Route Handlers
const handleRetrieve = require('./retrieve');
const handleAdd = require('./add');

// Routes
app.use(express.json());
app.post('/orders/retrieve/', handleRetrieve);
app.post('/orders/add/', handleAdd);

// Start Server
app.listen(port, () => console.log(`Order app listening on port ${port}`)); // eslint-disable-line no-console
