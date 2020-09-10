const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geoCode = require('./utils/geoCode');
const getForcast = require("./utils/getForcast");

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup hbs engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirectoryPath))

// Home Page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amitava Mitra'
    })
})
// About Page
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Amitava Mitra',
        title: 'About Page'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'No address Found!'
        })
    }
    geoCode(address, (error, {longitude, latitude, location}={}) => {
        if(error)
            return res.send({error})
        getForcast(longitude, latitude, (error, forcastData) => {
            if(error)
                return res.send({error})
            res.send({
                forecast: 'Its '+forcastData.temp+ ' degrees and there is '+forcastData.prep+'% chances of precipitation',
                location,
                address
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Amitava Mitra',
        title: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Amitava Mitra',
        title: '404',
        errorMsg: 'Help Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Amitava Mitra',
        title: '404',
        errorMsg: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running in port '+port)
})