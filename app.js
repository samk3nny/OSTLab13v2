var express = require('express');
var fs = require('fs');
var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/scripts'));

app.locals({
	title: 'Extended Express Example'
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

/**
app.get('/club/:page', function(req, res) {
	console.log('req: ' + req.params.page);
	res.render(req.params.page, { page: req.params.page });
});
**/
app.get('/club/:page', function(req, res) {
	console.log('req: ' + req.params.page);
	res.locals.pages.forEach(function(page) {
	  if (req.params.page === page.page) {
	    res.render(req.params.page, { page: page });
	  }
	})
});


app.get('api/posts', function(req, res) {
	res.json(res.locals.posts);
});

app.listen(3000);
console.log('app is listening at localhost:3000');
