const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaGFyZGlra2F0MjQiLCJhIjoiY2tkZnI0ZzJzMGc3NTJ4bzV5ZHJtcHYzMyJ9.V66zr4_A6hk6fjOUPLHOjA&limit=1'

    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services.', undefined)
        }
        else if(response.body.features.length == 0){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            const data = response.body

            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            })
        }
    })
}

module.exports = geocode