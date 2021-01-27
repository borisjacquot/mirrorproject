const test = require('../main.js');
const https = require('https');
const http = require('http');
const city = 'Lille';
require('dotenv').config();

module.exports.temp= function (){
    var request = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER}&units=metric`, function (response){
        var body = "";
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on("end", function () {
            try{
            var data_weather = JSON.parse(body);
            console.log(city, data_weather.main.temp);
            console.log(city, data_weather.weather[0].main, data_weather.weather[0].description);
            }catch(error){
                console.error(error);
            }
        });
    });
}
