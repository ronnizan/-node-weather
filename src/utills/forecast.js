const request = require("request")

// 50e15cd5070b90b6e56880e90aa5dc72;
// http://api.weatherstack.com/current?access_key=50e15cd5070b90b6e56880e90aa5dc72&query=37.8267,-122.4233;


const forecast = (lati,longi,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=50e15cd5070b90b6e56880e90aa5dc72&query=${lati},${longi}`

    request({url, json: true }, (error, response) => {
        if (error) {
            callback("enable to connect to weather services!")
        } else if (response.body.error) {
           callback("unable to find weather");
        }
        else {
            // const temp = response.body.current.temperature;
            // const feelLikeTemp = response.body.current.feelslike;
            const {temperature:temp, feelslike:feelLikeTemp} = response.body.current
            callback(undefined, `temp is: ${temp}, feels like:${feelLikeTemp}`)
        }
        
    
    })
    
}


module.exports = forecast;