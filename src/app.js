const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') // use hbs for dynamic templates(set up handlebars engine)
app.set('views', viewsDir) // set templates directory instead of views(views location)
hbs.registerPartials(partialsDir) // Set up partials directory

// Set up static directory to serve
app.use(express.static(publicDir))

// Weather Forecast Page
app.get('', (req, res) => {
    res.render('index')
})

// About Page
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        desc: 'A Weather Forecast App which uses Weather and Geocoding APIs.'
    })
})

// JSON endpoint for forecast data
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "Please enter address."
        })
    }

    // geocode finds latitude and longitude from locationName
    geocode(address, (error, data) => {
        if(error){
            return res.send({
                error
            })
        }
        
        // forecast fetches the data from latitude and longitude fetched
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location: data.location,
                forecastData,
                address
            })
        })
        
    })
})

// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        desc: 'Page not Found'
    })
})

// starts server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})