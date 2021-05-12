const http = require('http');

let dataToSend = {};



module.exports.getInfo = function () {

    var request = http.get(`http://localhost:5500/posts/`, function (response){
        var body = "";
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on("end", function () {
            try{
                dataToSend = JSON.parse(body);
            }catch(error){
                console.log(error);
            }
        });
    });
    return dataToSend;
}