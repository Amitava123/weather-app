const request = require('request');

const geoCode = (address, callback) => {
	var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYW1pdGF2YTEyMyIsImEiOiJja2VwNnRoNmkxb3ZzMnNrN3hpeWdzMGU1In0.qnalqmETIUk3SVjwghN43A&limit=1'
	request({ url: url, json: true }, function (error, response, body) {
		if (error) {
			callback('Connection to API unsuccessful!', undefined)
		} else if(body.features.length === 0) {
			callback('Bad Search Term Provided!', undefined)
		} else {
			callback(undefined, {
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				location: body.features[0].place_name
			})
		}
	})
}

module.exports = geoCode;