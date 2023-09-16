const express = require('express');
const { createObjectCsvWriter } = require('csv-writer');
const axios = require('axios');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse JSON body
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up the CSV writer
const csvWriter = createObjectCsvWriter({
    path: 'client_info.csv',
    header: ['UserAgent', 'Language', 'Timestamp'],
    append: true,
});

// Define a route to capture client information
app.post('/capture', async (req, res) => {
    const clientInfo = req.body;

    // Write client information to the CSV file
    csvWriter.writeRecords([clientInfo]);

    res.sendStatus(200);
});

// Define the index route
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
