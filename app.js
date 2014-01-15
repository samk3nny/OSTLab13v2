var express = require('express');
var fs = require('fs');
var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/club/public', express.static(__dirname + '/public'));
app.use('/club/scripts', express.static(__dirname + '/scripts'));

app.locals({
	title: 'OSTLab13v2'
});

app.all('*', function(req, res, next) {
	fs.readFile('pages.json', function(err, data) {
		res.locals.pages = JSON.parse(data);
		next();
	});
});

app.get('/', function(req, res) {
	res.render('main.ejs');
});

app.get('/post/:slug', function(req, res, next) {
	res.locals.posts.forEach(function(post) {
		if (req.params.slug === post.slug) {
			res.render('post.ejs', { post: post });
		}
	})
});

app.get('/club/:page', function(req, res) {
	console.log('req: ' + req.params.page);
	res.locals.pages.forEach(function(page) {
	  if (req.params.page === page.page) {
	    //res.render(req.params.page, { page: page });
	    res.render('club.ejs', { page: page });
	  }
	})
});


app.listen(3000);
console.log('app is listening at localhost:3000');
