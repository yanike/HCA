const fs = require('fs');
const parser = require('xml2json');

class Data {
	getDataFile() {
		var jsonData;

		fs.readFile('data.xml', function (err, data) {
			var json = JSON.parse(parser.toJson(data));
			jsonData = json;

			jsonData.app.balance = jsonData.app.balance + .25

			console.log(jsonData.app.items.item);
			for(var k in jsonData.app.items.item){
				console.log(jsonData.app.items.item[k]);
			}

			var stringified = JSON.stringify(json);
			var xml = parser.toXml(stringified);
			fs.writeFile('../data.xml', xml, function (err, data) {
				if (err) {
					console.log(err);
				}
				else {
					console.log('updated!');
				}
			});
		});

		return jsonData;
	}
}

var happy = new Data;
happy.getDataFile();