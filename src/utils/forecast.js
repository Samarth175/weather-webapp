const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/af22532a3e903b9f1ecce83da241b451/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?exclude=[minutely,hourly,daily]";

    request({url,json: true},(error,res,body) => {
        if(error)
            callback('Unable to connect to Forecasting service!');
        else if(body.error)
            callback('The given location is invalid');
        else
            callback(undefined,{
                temperature: body.currently.temperature,
                summary: body.currently.summary
            });
    });
}

module.exports = forecast;