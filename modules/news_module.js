var Feed = require('rss-to-json');

Feed.load('https://lemonde.fr/rss/une.xml', function(err, rss){
	    const truc = JSON.stringify(rss, null, 3);
	    const obj = JSON.parse(truc);
	    console.log(obj.items[0].title);
	    console.log(obj.items[0].description);
	    // il faudra ajouter un changement d'article toutes les 5 minutes (indice de items)
});
