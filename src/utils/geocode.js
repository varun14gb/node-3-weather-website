const request = require('request')

const geocode = (address, callack) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmFydW4xNGdiIiwiYSI6ImNqeXI4aWR1NTAyazMzY3A1dnZua2tmbTYifQ.qgw0ZuVJksB1xw17PwMaWg&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callack('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callack('Unable to find location! Try another search.')
        } else {
            callack(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1], 
                placename : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode