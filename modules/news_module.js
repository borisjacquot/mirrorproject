var Feed = require('rss-to-json');
var schedule = require('node-schedule');
let article = {"title": undefined, "description": undefined};

module.exports.news = function(){
  Feed.load('https://lemonde.fr/rss/une.xml', function(err, rss){
    article.title = rss.items[0].title;
    article.description = rss.items[0].description);
  });
  return article;
};
