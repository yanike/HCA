const fs = require('fs');
const parser = require('xml2json');

module.exports = class Actions {
	getSodas(response) {	
		console.log("#Actions getSodas.. Start");
		
		fs.readFile('data.xml', function (err, data) {
			var json = JSON.parse(parser.toJson(data));

			response.json(json.app.items.item);
		});
	}
}