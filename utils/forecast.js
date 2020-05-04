const request = require ('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude  , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5515505d913ae5cf696eb053c79db000&query=' + latitude + ',' + longitude

    request ({url, json: true},(error, {body})=>{
        if (error){
            callback('Unable to connect to weather forcast service!', undefined)
        }else if (body.error){
            callback('Unable to find location.', undefined)
        }else{
            callback(undefined, 'Its currently ' + body.current.temperature + ' but it feels like ' + body.current.feelslike)
        }
    })

}

module.exports = forecast