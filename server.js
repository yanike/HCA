// express
const { request, response } = require('express');
const express = require('express');
const app = express();

// database
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();
/*
// Initial data for database
database.insert([
    { id: 'coca_cola', name: 'Coca-Cola', value: '2.00', type: 'soda', quantity: '5.00'},
    { id: 'diet_coke', name: 'Diet Coke', value: '1.50', type: 'soda', quantity: '5.00'},
    { id: 'dr_pepper', name: 'Dr. Pepper', value: '2.50', type: 'soda', quantity: '5.00'},
    { id: 'sprite', name: 'Sprite', value: '2.50', type: 'soda', quantity: '5.00'},
    { id: 'fanta', name: 'Fanta', value: '2.00', type: 'soda', quantity: '5.00'},
    { id: 'ginger_ale', name: 'Ginger Ale', value: '2.00', type: 'soda', quantity: '5.00'},
]);
*/

// actions
const Actions = require('./js/Actions');

// Config the app with port and public files while setting a limit on post
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// API Endpoint
app.get('/api', (request, response) => {
    console.log("#API post.. Start");

    // Return response from Actions
    Actions.prototype.getSodas(response);
});