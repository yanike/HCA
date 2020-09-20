// Database
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

const fetch = require('node-fetch');
const fs = require('fs');

module.exports = class Actions {
	getSodas(response) {
		console.log("#Actions getSodas.. Start");

		database.find({}, (err, data) => {
			if (err) {
				throw err;
			} else {
				console.log(data);
				console.log("#Actions getSodas.. End");
				console.log("#API post.. End");
				response.json(data);
			}
		});
	}
}