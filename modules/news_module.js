var Feed = require('rss-to-json');
var schedule = require('node-schedule');
var article = 0; 

var j = schedule.scheduleJob('*/3 * * * *', function(){
  Feed.load('https://lemonde.fr/rss/une.xml', function(err, rss){
    const truc = JSON.stringify(rss, null, 3);
    const obj = JSON.parse(truc);
    console.log(obj.items[article].title);
    console.log(obj.items[article].description);
  });
  article = (article + 1) % 4;
});
