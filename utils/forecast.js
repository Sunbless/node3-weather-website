const request = require ('request')



const forecast = (latitude, longitude  , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5515505d913ae5cf696eb053c79db000&query=' + latitude + ',' + longitude 

    request ({url, json: true},(error, {body})=>{
        if (error){
            callback('Unable to connect to weather forcast service!', undefined)
        }else if (body.error){
            callback('Unable to find location.', undefined)
        }else{
            console.log(body.current) 
            callback(undefined, 'Its currently ' + body.current.temperature + ' but it feels like ' + body.current.feelslike + ' and the humidity is ' + body.current.humidity + '.')
        }
    })

}

module.exports = forecast