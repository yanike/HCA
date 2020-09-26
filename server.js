// express
const { request, response } = require('express');
const express = require('express');
const app = express();

// actions
const Actions = require('./js/Actions');

// Config the app with port and public files while setting a limit on post
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// API Endpoint
app.get('/api', (request, response) => {
    console.log("#API post.. Start");

    // Return response from Actions
    Actions.prototype.getSodas(response);
});

app.listen(3000, () => console.log('listening at http://localhost:3000'));