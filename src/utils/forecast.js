const request = require('request')

const forecast = (longitude, latitude, callack) => {
    const url = 'https://api.darksky.net/forecast/b8eb353ddc78f8ea0b6c0c059fc26d83/'+ longitude + ',' + latitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callack('Unable to connect to the weather service!')
        } else if (body.error) {
            return callack('Unable to find location!')
        } else {
            callack(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + (body.currently.precipProbability * 100) + '% chance of rain.')
        }
    })
}

module.exports = forecast