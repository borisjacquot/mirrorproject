var Feed = require('rss-to-json');
var schedule = require('node-schedule');
var article = 0;

var j = schedule.scheduleJob('*/3 * * * * *', function(){
  Feed.load('https://lemonde.fr/rss/une.xml', function(err, rss){
    console.log(rss.items[0].title);
    console.log(rss.items[0].description);
  });
  article = (article + 1) % 4;
});
