const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for Express directiory
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', ( req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vineet'
    })
})

app.get('/about', ( req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vineet Srivastava'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name:'Vineet'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    forecast( req.query.address, ( error, { temperature, location} = {}) => {
        if(error){
          return res.send({ error })
        }
        res.send({
            forecast: temperature,
            location,
            address: req.query.address
        })
      })
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Vineet',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Vineet',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})