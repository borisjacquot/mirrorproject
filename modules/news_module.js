const Parser = require('rss-parser');
let parser = new Parser();

let articles = [];

module.exports.news = function(){

  /*Feed.load('https://lemonde.fr/rss/une.xml', function(err, rss){
    article.title = rss.items[0].title;
    article.description = rss.items[0].description;
  });
  return article;*/

    parser.parseURL('https://lemonde.fr/rss/une.xml', function (err, feed) {
        for (let i = 0; i < 5; i++) {
            articles.push({
                "title": feed.items[i].title,
                "desc": feed.items[i].description
            });
        }
    });

    setTimeout(() => {
        return articles;
    }, 3000);





};
