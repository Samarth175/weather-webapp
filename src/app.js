const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

//Path for public and views directory
const publicDir = path.join(__dirname,"../public");
const viewsDir = path.join(__dirname,"../templates/views");
const partialsDir = path.join(__dirname,"../templates/partials");

//To deliver public assets
app.use(express.static(publicDir));

//Configure views directory and template engine
app.set('views',viewsDir);
app.set('view engine','hbs');

hbs.registerPartials(partialsDir);

app.get('',(req,res) => {
    res.render('index',{
        title: "Home Page",
        heading: "Home",
        message: "This is the home page",
        author: "Samarth Gupta"
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: "About Page",
        heading: "About",
        author: "Samarth Gupta"
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        title: "Help Page",
        heading: "Help",
        message: "This is the help page",
        author: "Samarth Gupta"
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "You have to provide address"
        });
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error)
            return res.send({
                error: error
            });
        
        forecast(latitude,longitude,(error,{temperature,summary} = {}) => {
            if(error)
                return res.send({
                    error: error
                });
    
            celsiusTemp = ((temperature-32)*5/9).toFixed(2) + " Celsius";

            res.send({
                Location: location,
                Temperature: celsiusTemp,
                Summary: summary
            });
        });
    });
});

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: "404",
        heading: "Error 404",
        message: "Help article not found",
        author: "Samarth Gupta"
    });
});

app.get('/*',(req,res) => {
    res.render('404',{
        title: "404",
        heading: "Error 404",
        message: "Page not found",
        author: "Samarth Gupta"
    });
});

app.listen(port,() => {
    console.log("Server is running on port " + port);
});