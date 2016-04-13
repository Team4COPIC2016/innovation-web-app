var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3030;
var environment = process.env.NODE_ENV || 'development';
var app = express();
var compile = function(str, path) {
	return stylus(str).set('filename', path)
};
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(stylus.middleware(
	{
		src : __dirname + '/public',
		compile : compile
	}
));
//deliver static content from the public directory
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/node_modules/'));
app.set('port', port);
//use server routing for partials so that the Jade view engine can resolve the HTML
app.get('/partials/:partialPath', function(request, response){
	response.render('partials/' + request.params.partialPath);
});
//use server routing to serve JSON for API
app.get('*', function(request, response) {
	response.render('index');
});
app.listen(port);
