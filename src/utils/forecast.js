const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&appid=cc4e8ad30952448fa259c553356bce12&units=metric'
    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to Weather Service.', undefined)
        }
        else if(response.body.cod == 400){
            callback('Unable to find location.', undefined)
        }
        else{
            const data = response.body
            
            callback(undefined, {
                main: data.weather[0].main, // Type of weather(Haze, Sunny)
                temp: data.main.temp,
                feels_like: data.main.feels_like
            })

        }
    })
}

module.exports = forecast