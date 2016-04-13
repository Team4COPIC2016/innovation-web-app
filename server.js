var express = require('express');
var stylus = require('stylus');
var fs = require("fs");
var bodyParser = require('body-parser');
var taskService = require('./server/services/task.js')
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
app.set('port', port);
//use server routing for partials so that the Jade view engine can resolve the HTML
app.get('/partials/:partialPath', function(request, response){
	response.render('partials/' + request.params.partialPath);
});

app.post('/api/task/', function(request, response){
  var task = JSON.parse(JSON.stringify(request.body));
  taskService.post(task).then(function(data) {
    response.json(data);
  })
});

app.get('/api/tasks/', function(request, response){
  var object = {
     "task1" : {
        "name" : "get dummy service 1",
        "description" : "get dummy service 1",
        "id": 1
     },
     "task2" : {
        "name" : "get dummy service 2",
        "description" : "get dummy service 2",
        "id": 2
     },
     "task3" : {
        "name" : "get dummy service 3",
        "description" : "get dummy service 3",
        "id": 3
     },
     "task4" : {
        "name" : "get dummy service 4",
        "description" : "get dummy service 4",
        "id": 4
     },
     "task5" : {
        "name" : "get dummy service 5",
        "description" : "get dummy service 5",
        "id": 5
     },
  }
  response.json(object);
});

app.listen(port);
