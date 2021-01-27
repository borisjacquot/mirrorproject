'use strict';

const https = require('https');
const fs = require('fs');
const schedule = require('node-schedule');
const ical = require('ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let date_ob = new Date();
let message = "";
const file = fs.createWriteStream("calendar.ics");
let event = []

module.exports.calendar = function(){
	const download = https.get("https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/d7f43f54-f27b-4ede-a932-38eacb92fac9/cid-745EC78AC30C3AC4/calendar.ics", function(response) {
		response.pipe(file);
		const data = ical.parseFile("calendar.ics");
		for (let k in data) {
			if (data.hasOwnProperty(k)) {
				var ev = data[k];
				if (data[k].type == 'VEVENT') {
					if (ev.start.getFullYear() === date_ob.getFullYear() && ev.start.getMonth() === date_ob.getUTCMonth() && ev.start.getDate() === date_ob.getUTCDate()) {
						event.push({"summary": ev.summary, "start": ev.start.toLocaleTimeString('fr-FR'), "end": ev.end.toLocaleTimeString('fr-FR'), "location": ev.location});
					}
				}
			}
		}
	});
	return event;
};
