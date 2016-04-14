var express = require('express');
var stylus = require('stylus');
var fs = require("fs");
var bodyParser = require('body-parser');
var Guid = require('guid');
var taskService = require('./server/services/task.js')
var lessonService = require('./server/services/lesson.js')
var employeeService = require('./server/services/employee.js')
var projectService = require('./server/services/project.js')
var groupService = require('./server/services/group.js')
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

app.get('/api/gettaskbyID/:id', function(request, response){
	var task = JSON.parse(JSON.stringify(taskService.getbyID(request.params.id)));
	response.json(task);
});

app.post('/api/employee/', function(request, response){
  var employee = JSON.parse(JSON.stringify(request.body));
  employeeService.post(employee).then(function(data) {
    response.json(data);
  })
});

app.get('/api/employee/:name', function(request, response){
	var employee = JSON.parse(JSON.stringify(employeeService.getbyName(request.params.name)));
	response.json(employee); 
})

app.get('/api/getemployeebyID/:id', function(request, response){
	var employee = JSON.parse(JSON.stringify(employeeService.getbyID(request.params.id)));
	response.json(employee);
});

app.post('/api/project/', function(request, response){
  var project = JSON.parse(JSON.stringify(request.body));
  projectService.post(project).then(function(data) {
    response.json(data);
  })
});

app.get('/api/project/:id', function(request, response){
	var project = JSON.parse(JSON.stringify(projectService.get(request.params.id)));
	response.json(project);
});

app.post('/api/group/', function(request, response){
  var group = JSON.parse(JSON.stringify(request.body));
  groupService.post(group).then(function(data) {
    response.json(data);
  })
});

app.get('/api/group/:id', function(request, response){
	var group = JSON.parse(JSON.stringify(groupService.get(request.params.id)));
	response.json(group);
});

app.post('/api/lesson/', function(request, response){
  var lesson = JSON.parse(JSON.stringify(request.body));
  lessonService.post(lesson).then(function(data) {
    response.json(data);
  })
});

app.get('/api/lesson/:id', function(request, response){
	var lesson = JSON.parse(JSON.stringify(lessonService.get(request.params.id)));
	response.json(lesson);
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
