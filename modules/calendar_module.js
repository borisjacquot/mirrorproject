'use strict';

const https = require('https');
const fs = require('fs');
const ical = require('ical');

let date_ob = new Date();


module.exports.download_calendar = function(){
	const file = fs.createWriteStream("calendar.ics");
	https.get("https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/d7f43f54-f27b-4ede-a932-38eacb92fac9/cid-745EC78AC30C3AC4/calendar.ics", function(response) {
		response.pipe(file);
	});
};

module.exports.calendar = function(){
	let event = []
	const promise1 = new Promise((resolve, reject) => {
		const data = ical.parseFile("calendar.ics");
		for (let k in data) {
			//console.log(k);
			if (data.hasOwnProperty(k)) {
				var ev = data[k];
				//console.log(ev);
				if (data[k].type == 'VEVENT') {
					if (ev.start.getFullYear() === date_ob.getFullYear() && ev.start.getMonth() === date_ob.getUTCMonth() && ev.start.getDate() === date_ob.getUTCDate()) {
						event.push({
							"summary": ev.summary,
							"start": ev.start.toLocaleTimeString('fr-FR'),
							"end": ev.end.toLocaleTimeString('fr-FR'),
							"location": ev.location
						});
					}
				}
			}
		}
		resolve(event);
	});
	return event;
};
