const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Varun'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Varun'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Varun'
    })
})

app.get('/weather', (req, res) => {
    if ( !req.query.address ) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode( req.query.address, (error, {latitude, placename, longitude} = {} ) => {
        if (error) {
            res.send({
                error
            })
        } else {
            forecast(longitude, latitude, (error, forecast) => {
                if (error) {
                    return res.send({
                        placename: placename,
                        error
                    })
                } else {
                    res.send({
                        placename: placename,
                        forecast,
                        address: req.query.address
                    })
                }
            })
        }
    })

})

app.get('/products', (req,res) => {
    if ( !req.query.search ) {
        return res.send({
            error: 'Please provide a query'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Varun',
        message: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Varun',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})