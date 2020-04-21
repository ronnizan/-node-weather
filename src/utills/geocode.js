const request = require("request")

// pk.eyJ1Ijoicm9uaXpvbiIsImEiOiJjazk0cDdhMW4wNzV4M2huMWVoOHE1eWM0In0.u3vDphiZY1fnXZ7SnC-swA
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoicm9uaXpvbiIsImEiOiJjazk0cDdhMW4wNzV4M2huMWVoOHE1eWM0In0.u3vDphiZY1fnXZ7SnC-swA&limit=1

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoicm9uaXpvbiIsImEiOiJjazk0cDdhMW4wNzV4M2huMWVoOHE1eWM0In0.u3vDphiZY1fnXZ7SnC-swA&limit=1"
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to location service!');
        } else if (response.body.features.length === 0) {
            callback("unable to find location");
        } else {
            callback(undefined,{
                lati: response.body.features[0].center[1],
                longi: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;