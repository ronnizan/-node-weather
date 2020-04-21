
const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')


const app = express();

// define path for express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'ron nizan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        imgUrl: '/assets/images/robot.png',
        name: 'ron nizan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        helpMsg: 'we are here to help you',
        name: 'ron nizan'

    })
})



app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'no address provided'
        })
    }

    geocode(req.query.address, (error, { location, lati, longi }= {}) => {

        if (error) {
            return res.send({ error });
        }

        forecast(lati, longi, (error, forecastMessage) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecastMessage,
                location
            })
        })


    })


})

app.get('/help/*', (req, res) => {
    res.render('page-not-found', {
        msg: "help article not found",
        title: "404",
        name: 'ron nizan'

    })
})

app.get('*', (req, res) => {
    res.render('page-not-found', {
        msg: "page  not found",
        title: "404",
        name: 'ron nizan'

    })
})

app.listen(3000, () => {
    console.log("server up")
})