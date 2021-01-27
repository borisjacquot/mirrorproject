const https = require('https');
const http = require('http');
const city = 'Lille';
let dataToSend = {"temp": undefined, "description": undefined, "icon": undefined};
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
            dataToSend.temp=data_weather.main.temp;
            dataToSend.icon=data_weather.weather[0].icon;
            dataToSend.description=data_weather.weather[0].main;
            // console.log(dataToSend )
        }catch(error){
            console.log(error);
        }
        });
    });
    return dataToSend;
}
