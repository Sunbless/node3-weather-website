const path = require('path')
const express = require('express')
const hbs = require ('hbs')

const forecast = require ('../utils/forecast')
const geocode = require ('../utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoyPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//reads directory we defined
app.use(express.static(publicDirectoyPath))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Tanja Mcc'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Tanja Mcc'
    })
})

app.get ('/help', (req,res)=>{
    res.render('help',{
        title:'Help page',
        message: 'This is where you can get all help that you need',
        name:'Tanja Mcc'
    })
})
 

//query string 
app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide a location.'
        })
    }

    geocode (req.query.address, (error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send({error: error })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
    }
    )

    // res.send({
    //     location: 'Sarajevo',
    //     forecast: 'Sunny', 
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: "You must provide search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Tanja Mcc',
        errorMessage:"Help article not found"
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title:'404',
        name: 'Tanja Mcc',
        errorMessage: "Page not found"
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port, ()=>{
    console.log('Server is up on the port ' + port)
})