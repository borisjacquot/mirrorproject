const Parser = require('rss-parser');
let parser = new Parser();
const getinfo = require("./getinfo")
let articles = [];
let feed;
const { PostsModel } = require('./postsModel');

module.exports.news = function(){

  /*Feed.load('https://lemonde.fr/rss/une.xml', function(err, rss){
    article.title = rss.items[0].title;
    article.description = rss.items[0].description;
  });
  return article;*/

    PostsModel.find((err, docs) => {
        if (!err) feed = docs;
        else console.log('Error to get data: ' + err);
    })

    const promise1 = new Promise((resolve, reject) => {
        parser.parseURL(feed[0].news, function (err, feed) {
                for (let i = 0; i < 5; i++) {
                    articles.push({
                        "title": feed.items[i].title,
                        "desc": feed.items[i].content
                    });
                }
        });
        resolve(articles);
    });
    return articles;
   
};
