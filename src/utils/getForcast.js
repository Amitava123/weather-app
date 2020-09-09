const request = require('request');

const getForcast = (long, lat, callback) => {
    var url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ long +'&appid=c763e6c1b04053c90b76e81311131680';

    request({url: url, json: true}, function (error, response, body) {
        if (error) {
            callback('Connection to API unsuccessful!', undefined)
        } else if(body.error) {
            callback('Bad Coordinates Provided!', undefined)
        } else {
            callback(undefined, {
                temp: body.current.temp,
                prep: body.minutely[0].precipitation
            })
        }
    });
}

module.exports = getForcast