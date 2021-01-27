'use strict';

const https = require('https');
const fs = require('fs');
const schedule = require('node-schedule');
const ical = require('ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let date_ob = new Date();
let message = "";
const file = fs.createWriteStream("calendar.ics");

var j = schedule.scheduleJob('*/1 * * *', function(){
  const lepasdecalais = https.get("https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/d7f43f54-f27b-4ede-a932-38eacb92fac9/cid-745EC78AC30C3AC4/calendar.ics", function(response) {
    response.pipe(file);
    const data = ical.parseFile("calendar.ics");
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
          var ev = data[k];
          if (data[k].type == 'VEVENT') {
	      if (ev.start.getFullYear() === date_ob.getFullYear() && ev.start.getMonth() === date_ob.getUTCMonth() && ev.start.getDate() === date_ob.getUTCDate()) {
	  	    message += ev.summary;
		    if (ev.start.toLocaleTimeString('fr-FR') !== "00:00:00" && ev.end.toLocaleTimeString('fr-FR') !== "00:00:00") {
		    	message += " de " + ev.start.toLocaleTimeString('fr-FR') + " à " + ev.end.toLocaleTimeString('fr-FR');
		    }
		    if (ev.location !== "") {
			message += " à " + ev.location;
			}
		    console.log(message);
	    }
        }
    }
  }
});
 
});

