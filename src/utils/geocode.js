const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1IjoiY29kZXJzYW0iLCJhIjoiY2p5dDFvc2NiMDIzODNwcGVyM2dodWF4bCJ9.gwjuULOb0PjrKO4Sk6J44Q";

    request({url,json: true},(error,res,body) => {
        if(error)
            callback('Unable to connect to Geocoding Service!');
        else if(body.features.length === 0)
            callback('Unable to search the given location!');
        else{
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,data);
        }
    });
}

module.exports = geocode;